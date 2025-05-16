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

interface CloudinaryResource {
    public_id: string;
    secure_url: string;
    resource_type: string;
}

async function getCloudinaryAssets(resourceType: 'image' | 'video'): Promise<string[]> {
    const assets: string[] = [];
    let nextCursor: string | undefined;

    do {
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: 'mymessage',
            resource_type: resourceType,
            max_results: 500,
            next_cursor: nextCursor
        });

        assets.push(...result.resources.map((r: CloudinaryResource) => r.public_id));
        nextCursor = result.next_cursor;
    } while (nextCursor);

    return assets;
}

async function getLocalAssets(): Promise<{ images: string[], videos: string[] }> {
    const images: string[] = [];
    const videos: string[] = [];

    async function walkDir(dir: string) {
        const files = await fs.promises.readdir(dir);
        
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = await fs.promises.stat(filePath);

            if (stat.isDirectory()) {
                await walkDir(filePath);
            } else {
                const ext = path.extname(file).toLowerCase();
                const relativePath = path.relative(ASSETS_DIR, filePath)
                    .replace(/\\/g, '/')
                    .replace(/\.[^/.]+$/, '');

                if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
                    images.push(`mymessage/${relativePath}`);
                } else if (['.mp4', '.mov', '.webm'].includes(ext)) {
                    videos.push(`mymessage/${relativePath}`);
                }
            }
        }
    }

    await walkDir(path.join(ASSETS_DIR, 'images'));
    await walkDir(path.join(ASSETS_DIR, 'videos'));

    return { images, videos };
}

async function main() {
    try {
        console.log('🔍 Checking Cloudinary assets...');
        const [cloudinaryImages, cloudinaryVideos] = await Promise.all([
            getCloudinaryAssets('image'),
            getCloudinaryAssets('video')
        ]);

        console.log('📁 Checking local assets...');
        const localAssets = await getLocalAssets();

        console.log('\n📊 Summary:');
        console.log(`Cloudinary Images: ${cloudinaryImages.length}`);
        console.log(`Cloudinary Videos: ${cloudinaryVideos.length}`);
        console.log(`Local Images: ${localAssets.images.length}`);
        console.log(`Local Videos: ${localAssets.videos.length}`);

        // Find missing files (files that are in Cloudinary but not locally)
        const missingImages = cloudinaryImages.filter(id => !localAssets.images.includes(id));
        const missingVideos = cloudinaryVideos.filter(id => !localAssets.videos.includes(id));

        // Find files to upload (files that are local but not in Cloudinary)
        const imagesToUpload = localAssets.images.filter(id => !cloudinaryImages.includes(id));
        const videosToUpload = localAssets.videos.filter(id => !cloudinaryVideos.includes(id));

        if (missingImages.length > 0 || missingVideos.length > 0) {
            console.log('\n⚠️  Files in Cloudinary but not found locally:');
            missingImages.forEach(id => console.log(`Image: ${id}`));
            missingVideos.forEach(id => console.log(`Video: ${id}`));
        }

        if (imagesToUpload.length > 0 || videosToUpload.length > 0) {
            console.log('\n📤 Files to upload (found locally but not in Cloudinary):');
            imagesToUpload.forEach(id => console.log(`Image: ${id}`));
            videosToUpload.forEach(id => console.log(`Video: ${id}`));
        }

        if (missingImages.length === 0 && missingVideos.length === 0 && 
            imagesToUpload.length === 0 && videosToUpload.length === 0) {
            console.log('\n✨ All files are in sync!');
        }

    } catch (error) {
        console.error('Failed to check assets:', error);
        process.exit(1);
    }
}

main(); 