# ShopSmart - MERN Stack E-Commerce Platform

A full-featured e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, product management, shopping cart, Stripe payment integration, admin dashboard, and AI-powered product recommendations.

## Features

### User Features
- **User Authentication**: JWT-based registration and login
- **Product Browsing**: Search and filter products by category, price, and rating
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout**: Complete purchase with Stripe payment integration
- **Order Tracking**: View order history and status
- **User Profile**: Manage account information

### Admin Features
- **Dashboard**: View sales statistics and recent orders
- **Product Management**: Add, edit, delete products
- **Order Management**: View and update order status
- **User Management**: View users and change roles

### AI Features
- **Product Recommendations**: Collaborative filtering-based recommendations
- **Related Products**: Products similar to viewed item

## Tech Stack

- **Frontend**: React.js 18, Vite, Redux Toolkit, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Payments**: Stripe API
- **Styling**: Custom CSS with responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Stripe account (for payment processing)

## Installation & Setup

### 1. Clone the repository
```bash
cd "c:/Users/HP/Desktop/E-commerce platform"
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopsmart
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

### 4. Frontend Setup
```bash
cd frontend
npm install
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 6. Seed Sample Data
After starting the backend, seed the database with sample products:
```bash
cd backend
node seed.js
```

## Project Structure

```
e-commerce-platform/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/   # Route controllers
│   ├── middleware/     # Auth middleware
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── seed.js        # Sample data seeder
│   ├── server.js      # Express server
│   └── .env           # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   │   └── admin/     # Admin pages
│   │   ├── store/        # Redux store
│   │   │   └── slices/   # Redux slices
│   │   ├── App.jsx       # Main app component
│   │   ├── main.jsx      # Entry point
│   │   └── index.css     # Global styles
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-profile` - Update profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/my-orders` - Get user's orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (admin)

### Recommendations
- `GET /api/recommendations` - Get AI recommendations

## Default Admin Account

-----Data hidden------

## Stripe Testing

Use Stripe's test card numbers for payment testing:
- **Card Number**: 4242 4242 4242 4242
- **Expiry**: Any future date
- **CVC**: Any 3 digits

## Screenshots

The application includes:
- Modern, responsive UI design
- Product grid with filters
- Shopping cart with quantity controls
- Checkout with Stripe payment
- Admin dashboard with statistics

## License

This project is for educational purposes.

