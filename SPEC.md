# E-Commerce Platform Specification

## 1. Project Overview
- **Project Name**: ShopSmart E-Commerce Platform
- **Type**: Full-stack MERN Web Application
- **Core Functionality**: A complete e-commerce platform with user authentication, product management, shopping cart, checkout with Stripe payment, admin dashboard, and AI-powered product recommendations
- **Target Users**: Online shoppers and store administrators

## 2. Tech Stack
- **Frontend**: React.js 18 with Vite, React Router, Redux Toolkit
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Payments**: Stripe API
- **AI Recommendations**: Collaborative filtering algorithm

## 3. UI/UX Specification

### Color Palette
- **Primary**: `#0F172A` (Deep Navy)
- **Secondary**: `#1E293B` (Slate)
- **Accent**: `#F59E0B` (Amber Gold)
- **Success**: `#10B981` (Emerald)
- **Error**: `#EF4444` (Red)
- **Background**: `#FAFAFA` (Off-white)
- **Text Primary**: `#1E293B`
- **Text Secondary**: `#64748B`

### Typography
- **Headings**: 'Playfair Display', serif
- **Body**: 'DM Sans', sans-serif
- **Font Sizes**:
  - H1: 3rem (48px)
  - H2: 2.25rem (36px)
  - H3: 1.5rem (24px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Visual Effects
- Card hover: translateY(-4px) with box-shadow
- Button hover: scale(1.02) with brightness increase
- Page transitions: fade-in 0.3s
- Loading states: skeleton screens
- Smooth scrolling throughout

## 4. Functionality Specification

### 4.1 User Authentication
- Registration with email, name, password
- Login with JWT token generation
- Password hashing with bcrypt
- Protected routes with JWT verification
- User roles: customer, admin
- Token stored in localStorage
- Auto-logout on token expiration

### 4.2 Product Listings
- Product grid with image, title, price, rating
- Search by product name/description
- Filters by:
  - Category (Electronics, Clothing, Home, Sports, Books)
  - Price range (slider)
  - Rating (star filter)
  - Sort by (price, popularity, newest)
- Pagination (12 products per page)
- Product detail page with:
  - Image gallery
  - Full description
  - Specifications
  - Reviews
  - Related products
  - Add to cart button

### 4.3 Shopping Cart
- Add/remove products
- Update quantities
- Calculate subtotal, tax, shipping
- Persist cart in localStorage
- Show cart icon with item count
- Slide-out cart drawer
- Apply coupon codes

### 4.4 Checkout & Payment
- Guest checkout option
- Address form with validation
- Order summary review
- Stripe payment integration:
  - Card element for payment
  - Test mode with test keys
  - Payment intent creation
- Order confirmation page
- Email notification (simulated)

### 4.5 Admin Dashboard
- **Products Management**:
  - Add new product
  - Edit existing product
  - Delete product
  - Bulk actions
- **Orders Management**:
  - View all orders
  - Update order status (pending, processing, shipped, delivered)
  - Order details view
- **Users Management**:
  - View all users
  - Change user role
- **Analytics**:
  - Total sales chart
  - Recent orders
  - Top products
- **Statistics Cards**:
  - Total revenue
  - Total orders
  - Total products
  - Total users

### 4.6 AI Product Recommendations
- Collaborative filtering based on:
  - User's purchase history
  - Similar users' preferences
  - Product categories
- "Recommended for You" section on homepage
- "Frequently bought together" on product page
- "You may also like" on cart page

## 5. API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-profile` - Update profile

### Product Routes
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Order Routes
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/my-orders` - Get user's orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (admin)

### Cart Routes
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart` - Update cart
- `DELETE /api/cart/:productId` - Remove from cart

### Recommendation Routes
- `GET /api/recommendations` - Get AI recommendations

## 6. Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  createdAt: Date
}
```

### Product
```javascript
{
  title: String,
  description: String,
  price: Number,
  category: String,
  images: [String],
  stock: Number,
  rating: Number,
  reviews: [{
    user: ObjectId,
    rating: Number,
    comment: String,
    createdAt: Date
  }],
  createdAt: Date
}
```

### Order
```javascript
{
  user: ObjectId,
  orderItems: [{
    product: ObjectId,
    title: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,
  paymentResult: {
    id: String,
    status: String
  },
  totalPrice: Number,
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered']),
  createdAt: Date
}
```

### Cart
```javascript
{
  user: ObjectId,
  items: [{
    product: ObjectId,
    quantity: Number
  }]
}
```

## 7. Project Structure

```
e-commerce-platform/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── recommendationController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── recommendations.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
│
└── README.md
```

## 8. Acceptance Criteria

### Authentication
- [ ] Users can register with email and password
- [ ] Users can login and receive JWT token
- [ ] Protected routes redirect to login
- [ ] Admin can access dashboard

### Products
- [ ] Products display in grid layout
- [ ] Search filters products by name
- [ ] Category filter works
- [ ] Price filter works
- [ ] Sort options work
- [ ] Product detail page shows all information

### Cart & Checkout
- [ ] Products can be added to cart
- [ ] Cart persists on page refresh
- [ ] Quantities can be updated
- [ ] Checkout form validates input
- [ ] Stripe payment form renders
- [ ] Order is created after payment

### Admin Dashboard
- [ ] Admin can view all orders
- [ ] Admin can update order status
- [ ] Admin can add/edit/delete products
- [ ] Dashboard shows statistics

### AI Recommendations
- [ ] Recommendations section on homepage
- [ ] Recommendations update based on behavior
- [ ] Related products on product page

