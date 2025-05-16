import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env file
config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const ASSETS_DIR = path.join(process.cwd(), 'public');

function sanitizePublicId(id: string): string {
    return id
        .replace(/[&]/g, 'and')           // Replace & with 'and'
        .replace(/[^a-zA-Z0-9\-_.\/]/g, '-')  // Replace any other special chars with dash
        .replace(/[-]+/g, '-')            // Replace multiple dashes with single dash
        .replace(/^-+|-+$/g, '');         // Remove leading/trailing dashes
}

async function uploadWithRetry(filePath: string, options: any, retries = 3): Promise<any> {
    try {
        return await cloudinary.uploader.upload(filePath, {
            ...options,
            timeout: 120000, // 2 minutes timeout for large files
        });
    } catch (error: any) {
        if (retries > 0 && (error.http_code === 499 || error.code === 'ECONNRESET')) {
            console.log(`Retrying upload... (${retries} attempts remaining)`);
            return await uploadWithRetry(filePath, options, retries - 1);
        }
        throw error;
    }
}

async function uploadAsset(filePath: string) {
    try {
        const relativePath = path.relative(ASSETS_DIR, filePath);
        // Convert Windows path separators to forward slashes, remove file extension, and sanitize
        const publicId = sanitizePublicId(
            relativePath
                .replace(/\\/g, '/')
                .replace(/\.[^/.]+$/, '')
        );

        console.log(`Uploading ${relativePath}...`);
        
        const result = await uploadWithRetry(filePath, {
            public_id: publicId,
            resource_type: "auto",
            folder: "mymessage",
            use_filename: true,
            unique_filename: false,
            overwrite: true
        });

        console.log(`✅ Uploaded ${relativePath} to Cloudinary`);
        console.log(`   URL: ${result.secure_url}`);
        return result;
    } catch (error) {
        console.error(`❌ Failed to upload ${filePath}:`, error);
        return null;
    }
}

async function walkDir(dir: string): Promise<string[]> {
    const files = await fs.promises.readdir(dir);
    const paths: string[] = [];

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.promises.stat(filePath);

        if (stat.isDirectory()) {
            paths.push(...(await walkDir(filePath)));
        } else {
            // Only include image and video files
            if (/\.(jpg|jpeg|png|gif|mp4|mov|webm|webp)$/i.test(file)) {
                paths.push(filePath);
            }
        }
    }

    return paths;
}

async function main() {
    try {
        console.log('🔍 Scanning for assets...');
        const files = await walkDir(ASSETS_DIR);
        console.log(`Found ${files.length} assets to upload\n`);

        for (const file of files) {
            await uploadAsset(file);
        }

        console.log('\n✨ All assets uploaded successfully!');
    } catch (error) {
        console.error('Failed to upload assets:', error);
        process.exit(1);
    }
}

main(); 