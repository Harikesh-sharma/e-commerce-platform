const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const sampleProducts = [
  {
    title: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.',
    price: 24999,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
    ],
    stock: 50,
    rating: 4.5,
    numReviews: 128,
    isFeatured: true,
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Driver Size': '40mm'
    }
  },
  {
    title: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health monitoring, GPS tracking, and 7-day battery life. Water-resistant and compatible with both iOS and Android.',
    price: 37499,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500'
    ],
    stock: 75,
    rating: 4.7,
    numReviews: 256,
    isFeatured: true,
    specifications: {
      'Display': 'AMOLED 1.4"',
      'Battery Life': '7 days',
      'Water Resistance': '5ATM',
      'Sensors': 'Heart rate, SpO2, GPS'
    }
  },
  {
    title: 'Minimalist Leather Backpack',
    description: 'Elegant leather backpack with laptop compartment, multiple pockets, and durable construction. Perfect for work and travel.',
    price: 15799,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    stock: 40,
    rating: 4.3,
    numReviews: 89,
    isFeatured: true,
    specifications: {
      'Material': 'Genuine Leather',
      'Laptop Size': 'Up to 15.6"',
      'Capacity': '25L',
      'Weight': '1.2kg'
    }
  },
  {
    title: 'Running Shoes Ultra',
    description: 'Lightweight running shoes with responsive cushioning, breathable mesh upper, and durable outsole. Ideal for marathon runners.',
    price: 13299,
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500'
    ],
    stock: 100,
    rating: 4.6,
    numReviews: 312,
    isFeatured: true,
    specifications: {
      'Weight': '280g',
      'Drop': '8mm',
      'Upper': 'Breathable Mesh',
      'Outsole': 'Rubber'
    }
  },
  {
    title: 'Organic Cotton T-Shirt',
    description: 'Comfortable organic cotton t-shirt with relaxed fit. Eco-friendly and perfect for everyday wear.',
    price: 2909,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
    ],
    stock: 200,
    rating: 4.2,
    numReviews: 67,
    specifications: {
      'Material': '100% Organic Cotton',
      'Fit': 'Relaxed',
      'Care': 'Machine Washable'
    }
  },
  {
    title: 'Professional DSLR Camera',
    description: 'High-resolution DSLR camera with 45.7MP sensor, 4K video recording, and advanced autofocus system. Perfect for professional photographers.',
    price: 207499,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500'
    ],
    stock: 15,
    rating: 4.9,
    numReviews: 45,
    isFeatured: true,
    specifications: {
      'Sensor': '45.7MP Full Frame',
      'Video': '4K 60fps',
      'ISO Range': '64-25600',
      'Autofocus': '153 points'
    }
  },
  {
    title: 'Yoga Mat Premium',
    description: 'Extra-thick yoga mat with non-slip surface and alignment lines. Eco-friendly TPE material.',
    price: 4159,
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'
    ],
    stock: 150,
    rating: 4.4,
    numReviews: 198,
    specifications: {
      'Thickness': '6mm',
      'Material': 'TPE',
      'Size': '183cm x 61cm',
      'Weight': '2kg'
    }
  },
  {
    title: 'Bestseller Novel Collection',
    description: 'Collection of 5 bestselling novels from acclaimed authors. Perfect for book lovers.',
    price: 6649,
    category: 'Books',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'
    ],
    stock: 80,
    rating: 4.5,
    numReviews: 156,
    specifications: {
      'Format': 'Paperback',
      'Pages': '320 avg per book',
      'Language': 'English'
    }
  },
  {
    title: 'Smart Home Speaker',
    description: 'Voice-controlled smart speaker with premium sound, multi-room audio, and smart home integration.',
    price: 16599,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500'
    ],
    stock: 60,
    rating: 4.6,
    numReviews: 234,
    isFeatured: true,
    specifications: {
      'Audio': '360° Sound',
      'Connectivity': 'WiFi, Bluetooth',
      'Voice Assistant': 'Built-in',
      'Compatibility': 'Alexa, Google Assistant'
    }
  },
  {
    title: 'Fitness Tracker Band',
    description: 'Slim fitness tracker with heart rate monitor, sleep tracking, and 14-day battery life. Water-resistant design.',
    price: 6639,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500'
    ],
    stock: 120,
    rating: 4.3,
    numReviews: 189,
    specifications: {
      'Display': 'OLED 0.95"',
      'Battery': '14 days',
      'Water Resistance': '5ATM',
      'Sensors': 'Heart rate, Sleep'
    }
  },
  {
    title: 'Designer Sunglasses',
    description: 'Premium polarized sunglasses with UV400 protection. Stylish design with scratch-resistant lenses.',
    price: 13279,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'
    ],
    stock: 45,
    rating: 4.5,
    numReviews: 78,
    specifications: {
      'Lens': 'Polarized',
      'UV Protection': 'UV400',
      'Frame': 'Acetate',
      'Includes': 'Case, Cloth'
    }
  },
  {
    title: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with built-in grinder, thermal carafe, and multiple brew options.',
    price: 10799,
    category: 'Home',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500'
    ],
    stock: 35,
    rating: 4.4,
    numReviews: 145,
    isFeatured: true,
    specifications: {
      'Capacity': '12 cups',
      'Features': 'Grinder, Timer',
      'Material': 'Stainless Steel',
      'Warranty': '2 years'
    }
  },
  {
    title: 'Portable Bluetooth Speaker',
    description: 'Waterproof bluetooth speaker with 360° sound, 24-hour battery life, and rugged design.',
    price: 7469,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'
    ],
    stock: 90,
    rating: 4.7,
    numReviews: 267,
    specifications: {
      'Battery': '24 hours',
      'Waterproof': 'IPX7',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '540g'
    }
  },
  {
    title: 'Non-Stick Cookware Set',
    description: '10-piece cookware set with ceramic non-stick coating, oven-safe, and dishwasher safe.',
    price: 16599,
    category: 'Home',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500'
    ],
    stock: 25,
    rating: 4.5,
    numReviews: 112,
    specifications: {
      'Pieces': '10',
      'Material': 'Aluminum',
      'Coating': 'Ceramic',
      'Heat Resistance': 'Up to 450°F'
    }
  },
  {
    title: 'Tennis Racket Pro',
    description: 'Professional tennis racket with carbon fiber frame, optimal string tension, and lightweight design.',
    price: 15799,
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1617083934555-563404543793?w=500'
    ],
    stock: 30,
    rating: 4.6,
    numReviews: 56,
    specifications: {
      'Weight': '285g',
      'Head Size': '100 sq in',
      'String Pattern': '16x19',
      'Frame': 'Carbon Fiber'
    }
  },
  {
    title: 'Programming Books Bundle',
    description: 'Comprehensive programming books covering Python, JavaScript, React, and Node.js. Perfect for beginners and pros.',
    price: 9959,
    category: 'Books',
    images: [
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500'
    ],
    stock: 55,
    rating: 4.8,
    numReviews: 203,
    specifications: {
      'Books': '4',
      'Format': 'Paperback',
      'Total Pages': '2000+',
      'Level': 'Beginner to Advanced'
    }
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted successfully');

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@shopsmart.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@shopsmart.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created: admin@shopsmart.com / admin123');
    }

    // Create test user
    const testUserExists = await User.findOne({ email: 'user@shopsmart.com' });
    if (!testUserExists) {
      await User.create({
        name: 'Test User',
        email: 'user@shopsmart.com',
        password: 'user123',
        role: 'user'
      });
      console.log('Test user created: user@shopsmart.com / user123');
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

