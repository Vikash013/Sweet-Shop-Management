// Script to update existing shop images with Unsplash URLs
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const imageUpdates = [
  { name: "Sweet Paradise", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=200&fit=crop&crop=center" },
  { name: "Mithai Junction", imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=200&fit=crop&crop=center" },
  { name: "Sugar Rush", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=200&fit=crop&crop=center" },
  { name: "Desi Sweets Corner", imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=200&fit=crop&crop=center" },
  { name: "Royal Sweets Palace", imageUrl: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=200&fit=crop&crop=center" },
  { name: "Chocolate Heaven", imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=200&fit=crop&crop=center" },
  { name: "Bengali Sweet House", imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=200&fit=crop&crop=center" },
  { name: "Modern Confectionery", imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=200&fit=crop&crop=center" }
];

async function updateImages() {
  try {
    console.log('🖼️ Updating shop images...');

    for (const update of imageUpdates) {
      await prisma.shop.updateMany({
        where: { name: update.name },
        data: { imageUrl: update.imageUrl }
      });
      console.log(`✅ Updated image for ${update.name}`);
    }

    console.log('🎉 Image updates completed successfully!');
  } catch (error) {
    console.error('❌ Error updating images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateImages();