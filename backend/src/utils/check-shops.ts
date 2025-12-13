// Script to check current shop data
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkShops() {
  try {
    console.log('📋 Checking current shop data...');

    const shops = await prisma.shop.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
        isOpen: true
      },
      orderBy: {
        id: 'asc'
      }
    });

    console.log(`\nFound ${shops.length} shops:\n`);
    
    shops.forEach((shop, index) => {
      console.log(`${index + 1}. ${shop.name}`);
      console.log(`   Image: ${shop.imageUrl}`);
      console.log(`   Status: ${shop.isOpen ? 'Open' : 'Closed'}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error checking shops:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkShops();