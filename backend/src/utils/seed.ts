// Seed script to populate database with dummy data
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const shops = [
  {
    name: "Sweet Paradise",
    description: "Premium sweets and desserts",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=200&fit=crop&crop=center",
    rating: 4.5,
    address: "123 Sweet Street, Mumbai",
    phone: "+91 9876543210",
    isOpen: true
  },
  {
    name: "Mithai Junction",
    description: "Traditional Indian sweets",
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=200&fit=crop&crop=center",
    rating: 4.2,
    address: "456 Dessert Lane, Delhi",
    phone: "+91 9876543211",
    isOpen: true
  },
  {
    name: "Sugar Rush",
    description: "Modern confectionery and chocolates",
    imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=200&fit=crop&crop=center",
    rating: 4.7,
    address: "789 Candy Avenue, Bangalore",
    phone: "+91 9876543212",
    isOpen: true
  },
  {
    name: "Desi Sweets Corner",
    description: "Authentic regional sweets",
    imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=200&fit=crop&crop=center",
    rating: 4.0,
    address: "321 Traditional Road, Kolkata",
    phone: "+91 9876543213",
    isOpen: false
  },
  {
    name: "Royal Sweets Palace",
    description: "Luxury sweets and gift boxes",
    imageUrl: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=200&fit=crop&crop=center",
    rating: 4.8,
    address: "567 Royal Street, Jaipur",
    phone: "+91 9876543214",
    isOpen: true
  },
  {
    name: "Chocolate Heaven",
    description: "Artisan chocolates and truffles",
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=200&fit=crop&crop=center",
    rating: 4.6,
    address: "890 Cocoa Lane, Pune",
    phone: "+91 9876543215",
    isOpen: true
  },
  {
    name: "Bengali Sweet House",
    description: "Authentic Bengali sweets",
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=200&fit=crop&crop=center",
    rating: 4.3,
    address: "234 Heritage Road, Kolkata",
    phone: "+91 9876543216",
    isOpen: true
  },
  {
    name: "Modern Confectionery",
    description: "Contemporary desserts and cakes",
    imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=200&fit=crop&crop=center",
    rating: 4.4,
    address: "678 Innovation Street, Hyderabad",
    phone: "+91 9876543217",
    isOpen: true
  },
  {
    name: "Candy Castle",
    description: "Colorful candies and gummies",
    imageUrl: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&h=200&fit=crop&crop=center",
    rating: 4.1,
    address: "901 Rainbow Street, Chennai",
    phone: "+91 9876543218",
    isOpen: true
  },
  {
    name: "Artisan Bakery",
    description: "Handcrafted pastries and desserts",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab794f4afe5e?w=400&h=200&fit=crop&crop=center",
    rating: 4.6,
    address: "234 Baker's Lane, Goa",
    phone: "+91 9876543219",
    isOpen: true
  },
  {
    name: "Ice Cream Dreams",
    description: "Premium ice creams and frozen treats",
    imageUrl: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=200&fit=crop&crop=center",
    rating: 4.3,
    address: "567 Frozen Avenue, Shimla",
    phone: "+91 9876543220",
    isOpen: true
  },
  {
    name: "Cupcake Corner",
    description: "Delicious cupcakes and muffins",
    imageUrl: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&h=200&fit=crop&crop=center",
    rating: 4.2,
    address: "890 Cupcake Street, Lucknow",
    phone: "+91 9876543221",
    isOpen: true
  },
  {
    name: "Donut Delight",
    description: "Fresh donuts and coffee",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=200&fit=crop&crop=center",
    rating: 4.0,
    address: "123 Donut Drive, Indore",
    phone: "+91 9876543222",
    isOpen: false
  },
  {
    name: "Cookie Jar",
    description: "Homemade cookies and biscuits",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=200&fit=crop&crop=center",
    rating: 4.4,
    address: "456 Cookie Lane, Ahmedabad",
    phone: "+91 9876543223",
    isOpen: true
  },
  {
    name: "Macaron Magic",
    description: "French macarons and petit fours",
    imageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=200&fit=crop&crop=center",
    rating: 4.7,
    address: "789 French Quarter, Pondicherry",
    phone: "+91 9876543224",
    isOpen: true
  },
  {
    name: "Brownie Bliss",
    description: "Rich brownies and fudge",
    imageUrl: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=200&fit=crop&crop=center",
    rating: 4.5,
    address: "321 Chocolate Avenue, Mysore",
    phone: "+91 9876543225",
    isOpen: true
  },
  {
    name: "Pie Paradise",
    description: "Traditional pies and tarts",
    imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=200&fit=crop&crop=center",
    rating: 4.1,
    address: "654 Pie Street, Kochi",
    phone: "+91 9876543226",
    isOpen: true
  },
  {
    name: "Honey Hive",
    description: "Natural honey-based sweets",
    imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=200&fit=crop&crop=center",
    rating: 4.3,
    address: "987 Honey Lane, Dehradun",
    phone: "+91 9876543227",
    isOpen: true
  },
  {
    name: "Gelato Garden",
    description: "Authentic Italian gelato",
    imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=200&fit=crop&crop=center",
    rating: 4.6,
    address: "147 Italian Street, Mumbai",
    phone: "+91 9876543228",
    isOpen: true
  },
  {
    name: "Sweet Symphony",
    description: "Musical themed desserts and treats",
    imageUrl: "https://images.unsplash.com/photo-1571197119282-7c4e2b2d9c6b?w=400&h=200&fit=crop&crop=center",
    rating: 4.8,
    address: "258 Melody Road, Chandigarh",
    phone: "+91 9876543229",
    isOpen: true
  }
];

const sweetsByShop = [
  // Sweet Paradise
  [
    { name: "Gulab Jamun", description: "Soft milk dumplings in sugar syrup", price: 120, quantity: 50, category: "Traditional", imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop" },
    { name: "Rasgulla", description: "Spongy cottage cheese balls", price: 100, quantity: 30, category: "Bengali", imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop" },
    { name: "Chocolate Truffle", description: "Rich chocolate dessert", price: 200, quantity: 25, category: "Modern", imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&h=200&fit=crop" }
  ],
  // Mithai Junction
  [
    { name: "Kaju Katli", description: "Diamond-shaped cashew fudge", price: 400, quantity: 20, category: "Premium", imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=200&fit=crop" },
    { name: "Laddu", description: "Round sweet balls", price: 80, quantity: 40, category: "Traditional", imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop" },
    { name: "Jalebi", description: "Crispy spiral sweets", price: 90, quantity: 35, category: "Traditional", imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop" }
  ],
  // Sugar Rush
  [
    { name: "Dark Chocolate", description: "Premium dark chocolate bars", price: 250, quantity: 15, category: "Chocolate", imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&h=200&fit=crop" },
    { name: "Macarons", description: "French sandwich cookies", price: 300, quantity: 20, category: "Modern", imageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=300&h=200&fit=crop" },
    { name: "Cheesecake", description: "Creamy baked cheesecake", price: 350, quantity: 10, category: "Modern", imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&h=200&fit=crop" }
  ],
  // Desi Sweets Corner
  [
    { name: "Sandesh", description: "Bengali cottage cheese sweet", price: 150, quantity: 25, category: "Bengali", imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=200&fit=crop" },
    { name: "Mysore Pak", description: "South Indian ghee sweet", price: 180, quantity: 30, category: "South Indian", imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop" },
    { name: "Peda", description: "Milk-based round sweets", price: 120, quantity: 40, category: "Traditional", imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop" }
  ],
  // Royal Sweets Palace
  [
    { name: "Royal Baklava", description: "Layered pastry with nuts", price: 450, quantity: 15, category: "Premium", imageUrl: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=300&h=200&fit=crop" },
    { name: "Gold Leaf Sweets", description: "Luxury sweets with gold", price: 800, quantity: 5, category: "Luxury", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop" },
    { name: "Diamond Cuts", description: "Premium diamond-shaped treats", price: 600, quantity: 10, category: "Premium", imageUrl: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=300&h=200&fit=crop" }
  ],
  // Chocolate Heaven
  [
    { name: "Belgian Truffles", description: "Handcrafted Belgian chocolates", price: 500, quantity: 20, category: "Chocolate", imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&h=200&fit=crop" },
    { name: "Cocoa Bombs", description: "Hot chocolate bombs", price: 150, quantity: 30, category: "Modern", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop" },
    { name: "Artisan Bars", description: "Handmade chocolate bars", price: 300, quantity: 25, category: "Chocolate", imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&h=200&fit=crop" }
  ],
  // Bengali Sweet House
  [
    { name: "Mishti Doi", description: "Sweet yogurt dessert", price: 80, quantity: 40, category: "Bengali", imageUrl: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=300&h=200&fit=crop" },
    { name: "Chom Chom", description: "Oval-shaped spongy sweet", price: 120, quantity: 35, category: "Bengali", imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=200&fit=crop" },
    { name: "Kalakand", description: "Milk cake squares", price: 200, quantity: 20, category: "Traditional", imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop" }
  ],
  // Modern Confectionery
  [
    { name: "Red Velvet Cake", description: "Classic red velvet with cream cheese", price: 400, quantity: 12, category: "Modern", imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&h=200&fit=crop" },
    { name: "Tiramisu", description: "Italian coffee-flavored dessert", price: 350, quantity: 15, category: "Modern", imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&h=200&fit=crop" },
    { name: "Fusion Sweets", description: "Modern twist on traditional sweets", price: 250, quantity: 25, category: "Fusion", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop" }
  ],
  // Candy Castle
  [
    { name: "Gummy Bears", description: "Colorful chewy gummy candies", price: 60, quantity: 100, category: "Candy", imageUrl: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=200&fit=crop" },
    { name: "Lollipops", description: "Rainbow colored lollipops", price: 40, quantity: 80, category: "Candy", imageUrl: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=200&fit=crop" },
    { name: "Cotton Candy", description: "Fluffy spun sugar treat", price: 80, quantity: 50, category: "Candy", imageUrl: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=200&fit=crop" }
  ],
  // Artisan Bakery
  [
    { name: "Croissants", description: "Buttery flaky pastries", price: 120, quantity: 30, category: "Pastry", imageUrl: "https://images.unsplash.com/photo-1555507036-ab794f4afe5e?w=300&h=200&fit=crop" },
    { name: "Danish Pastry", description: "Sweet layered pastry", price: 150, quantity: 25, category: "Pastry", imageUrl: "https://images.unsplash.com/photo-1555507036-ab794f4afe5e?w=300&h=200&fit=crop" },
    { name: "Eclairs", description: "Cream-filled choux pastry", price: 180, quantity: 20, category: "Pastry", imageUrl: "https://images.unsplash.com/photo-1555507036-ab794f4afe5e?w=300&h=200&fit=crop" }
  ],
  // Ice Cream Dreams
  [
    { name: "Vanilla Bean", description: "Classic vanilla ice cream", price: 100, quantity: 40, category: "Ice Cream", imageUrl: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=300&h=200&fit=crop" },
    { name: "Chocolate Fudge", description: "Rich chocolate ice cream", price: 120, quantity: 35, category: "Ice Cream", imageUrl: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=300&h=200&fit=crop" },
    { name: "Strawberry Swirl", description: "Fresh strawberry ice cream", price: 110, quantity: 30, category: "Ice Cream", imageUrl: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=300&h=200&fit=crop" }
  ],
  // Cupcake Corner
  [
    { name: "Chocolate Cupcake", description: "Moist chocolate cupcake with frosting", price: 80, quantity: 50, category: "Cupcake", imageUrl: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=300&h=200&fit=crop" },
    { name: "Vanilla Cupcake", description: "Classic vanilla with buttercream", price: 70, quantity: 45, category: "Cupcake", imageUrl: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=300&h=200&fit=crop" },
    { name: "Red Velvet Cupcake", description: "Red velvet with cream cheese frosting", price: 90, quantity: 40, category: "Cupcake", imageUrl: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=300&h=200&fit=crop" }
  ],
  // Donut Delight
  [
    { name: "Glazed Donut", description: "Classic glazed ring donut", price: 50, quantity: 60, category: "Donut", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&h=200&fit=crop" },
    { name: "Chocolate Donut", description: "Chocolate glazed donut", price: 60, quantity: 55, category: "Donut", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&h=200&fit=crop" },
    { name: "Jelly Filled", description: "Donut filled with strawberry jelly", price: 70, quantity: 40, category: "Donut", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&h=200&fit=crop" }
  ],
  // Cookie Jar
  [
    { name: "Chocolate Chip", description: "Classic chocolate chip cookies", price: 40, quantity: 80, category: "Cookie", imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop" },
    { name: "Oatmeal Raisin", description: "Chewy oatmeal cookies with raisins", price: 45, quantity: 70, category: "Cookie", imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop" },
    { name: "Sugar Cookies", description: "Sweet sugar cookies with icing", price: 35, quantity: 90, category: "Cookie", imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop" }
  ],
  // Macaron Magic
  [
    { name: "French Macarons", description: "Delicate almond meringue cookies", price: 200, quantity: 30, category: "Macaron", imageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=300&h=200&fit=crop" },
    { name: "Chocolate Macarons", description: "Rich chocolate flavored macarons", price: 220, quantity: 25, category: "Macaron", imageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=300&h=200&fit=crop" },
    { name: "Raspberry Macarons", description: "Tart raspberry macarons", price: 210, quantity: 28, category: "Macaron", imageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=300&h=200&fit=crop" }
  ],
  // Brownie Bliss
  [
    { name: "Fudge Brownies", description: "Rich and fudgy chocolate brownies", price: 120, quantity: 40, category: "Brownie", imageUrl: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=300&h=200&fit=crop" },
    { name: "Walnut Brownies", description: "Brownies with crunchy walnuts", price: 140, quantity: 35, category: "Brownie", imageUrl: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=300&h=200&fit=crop" },
    { name: "Caramel Brownies", description: "Brownies with caramel swirl", price: 160, quantity: 30, category: "Brownie", imageUrl: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=300&h=200&fit=crop" }
  ],
  // Pie Paradise
  [
    { name: "Apple Pie", description: "Classic apple pie with cinnamon", price: 300, quantity: 15, category: "Pie", imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300&h=200&fit=crop" },
    { name: "Pumpkin Pie", description: "Spiced pumpkin pie", price: 320, quantity: 12, category: "Pie", imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300&h=200&fit=crop" },
    { name: "Cherry Pie", description: "Sweet and tart cherry pie", price: 340, quantity: 10, category: "Pie", imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300&h=200&fit=crop" }
  ],
  // Honey Hive
  [
    { name: "Honey Cakes", description: "Moist cakes made with pure honey", price: 180, quantity: 25, category: "Honey", imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=200&fit=crop" },
    { name: "Honey Cookies", description: "Crispy cookies sweetened with honey", price: 60, quantity: 50, category: "Honey", imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=200&fit=crop" },
    { name: "Honeycomb Candy", description: "Crunchy honeycomb toffee", price: 100, quantity: 40, category: "Honey", imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=200&fit=crop" }
  ],
  // Gelato Garden
  [
    { name: "Pistachio Gelato", description: "Authentic Italian pistachio gelato", price: 150, quantity: 30, category: "Gelato", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop" },
    { name: "Stracciatella", description: "Vanilla gelato with chocolate chips", price: 140, quantity: 35, category: "Gelato", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop" },
    { name: "Tiramisu Gelato", description: "Coffee-flavored gelato", price: 160, quantity: 25, category: "Gelato", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop" }
  ],
  // Sweet Symphony
  [
    { name: "Musical Notes", description: "Note-shaped chocolate treats", price: 200, quantity: 30, category: "Themed", imageUrl: "https://images.unsplash.com/photo-1571197119282-7c4e2b2d9c6b?w=300&h=200&fit=crop" },
    { name: "Piano Keys", description: "Black and white striped cookies", price: 120, quantity: 40, category: "Themed", imageUrl: "https://images.unsplash.com/photo-1571197119282-7c4e2b2d9c6b?w=300&h=200&fit=crop" },
    { name: "Symphony Cake", description: "Multi-layered musical themed cake", price: 500, quantity: 8, category: "Themed", imageUrl: "https://images.unsplash.com/photo-1571197119282-7c4e2b2d9c6b?w=300&h=200&fit=crop" }
  ]
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Create shops and their sweets (without clearing existing data to avoid transaction issues)
    for (let i = 0; i < shops.length; i++) {
      // Check if shop already exists
      const existingShop = await prisma.shop.findFirst({
        where: { name: shops[i].name }
      });

      if (existingShop) {
        console.log(`⏭️ Shop ${shops[i].name} already exists, skipping...`);
        continue;
      }

      const shop = await prisma.shop.create({
        data: shops[i]
      });

      console.log(`✅ Created shop: ${shop.name}`);

      // Create sweets for this shop
      for (const sweetData of sweetsByShop[i]) {
        await prisma.sweet.create({
          data: {
            ...sweetData,
            shopId: shop.id
          }
        });
      }

      console.log(`✅ Added ${sweetsByShop[i].length} sweets to ${shop.name}`);
    }

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase };