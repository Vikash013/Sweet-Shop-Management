// Script to update ALL shop images with high-quality Unsplash URLs
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateAllImages() {
  try {
    console.log('🖼️ Updating all shop images with high-quality images...');

    // Get all shops
    const shops = await prisma.shop.findMany();
    console.log(`Found ${shops.length} shops to update`);

    const imageUrls = [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1555507036-ab794f4afe5e?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=200&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1571197119282-7c4e2b2d9c6b?w=400&h=200&fit=crop&crop=center"
    ];

    // Update each shop with a different image
    for (let i = 0; i < shops.length; i++) {
      const shop = shops[i];
      const imageUrl = imageUrls[i % imageUrls.length];
      
      await prisma.shop.update({
        where: { id: shop.id },
        data: { imageUrl: imageUrl }
      });
      
      console.log(`✅ Updated ${shop.name} with new image`);
    }

    console.log('🎉 All shop images updated successfully!');
  } catch (error) {
    console.error('❌ Error updating images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAllImages();