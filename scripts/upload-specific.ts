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
            timeout: 300000, // 5 minutes timeout for large files
            chunk_size: 20000000 // 20MB chunks
        });
    } catch (error: any) {
        if (retries > 0 && (error.http_code === 499 || error.code === 'ECONNRESET')) {
            console.log(`Retrying upload... (${retries} attempts remaining)`);
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retry
            return await uploadWithRetry(filePath, options, retries - 1);
        }
        throw error;
    }
}

async function uploadAsset(filePath: string) {
    try {
        const relativePath = path.relative(ASSETS_DIR, filePath);
        const publicId = sanitizePublicId(
            relativePath
                .replace(/\\/g, '/')
                .replace(/\.[^/.]+$/, '')
        );

        const ext = path.extname(filePath).toLowerCase();
        const resourceType = ['.mp4', '.mov', '.webm'].includes(ext) ? 'video' : 'image';

        console.log(`Uploading ${relativePath}...`);
        console.log(`Resource type: ${resourceType}`);
        console.log(`Public ID: ${publicId}`);
        
        const result = await uploadWithRetry(filePath, {
            public_id: publicId,
            resource_type: resourceType,
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

async function main() {
    const filesToUpload = [
        path.join(ASSETS_DIR, 'images', 'Regular Fit Soft Twill Smart Shirt & Pants Set _ boohooMAN USA.jpg'),
        path.join(ASSETS_DIR, 'videos', '3753682-uhd_3840_2160_25fps.mp4'),
        path.join(ASSETS_DIR, 'videos', '3753702-uhd_3840_2160_25fps.mp4')
    ];

    console.log('🔄 Starting upload of specific files...\n');

    for (const file of filesToUpload) {
        if (!fs.existsSync(file)) {
            console.log(`⚠️  File not found: ${file}`);
            continue;
        }
        await uploadAsset(file);
        // Wait 2 seconds between uploads
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('\n✨ Upload completed!');
}

main(); 