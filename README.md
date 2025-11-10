# 💎 Luxury Jewellery Store - Full Stack Application

A complete full-stack web application for a jewellery business with user authentication, product management, and an elegant landing page.

## 🚀 Technology Stack

- **Frontend**: React.js (Vite), HTML, CSS, JavaScript, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Token)
- **Styling**: Custom CSS with elegant design

## 📂 Project Structure

```
fullstack-jewellery-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── productController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Products.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. Update the `MONGODB_URI` with your MongoDB Atlas connection string:
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get your connection string and replace the placeholder

5. Start the backend server:
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

   The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file in the frontend directory if you need to change the API URL:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

5. Build for production:
   ```bash
   npm run build
   ```

## 🎯 Features

### User Features
- ✅ View all jewellery products on homepage
- ✅ Browse products by category
- ✅ User registration and login
- ✅ Protected dashboard page
- ✅ Contact form

### Admin Features
- ✅ Add new products
- ✅ View all products in admin dashboard
- ✅ Delete products
- ✅ Mark products as featured or in stock

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products (with optional query params: `category`, `featured`)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

## 🔐 Authentication

The application uses JWT (JSON Web Token) for authentication. When a user logs in or registers, they receive a token that must be included in the Authorization header for protected routes:

```
Authorization: Bearer <token>
```

## 👤 Default Admin User

To create an admin user, you can either:
1. Manually update the user in MongoDB to set `role: 'admin'`
2. Or register a user and update it via MongoDB Compass or Atlas UI

## 🎨 Design Features

- Elegant and minimal design
- Responsive layout for mobile and desktop
- Smooth animations and transitions
- Luxury-themed color scheme (gold accents)
- Hero section with call-to-action
- Product gallery with filtering
- Contact form

## 🚀 Deployment

### Backend Deployment (e.g., Heroku, Railway, Render)
1. Set environment variables in your hosting platform
2. Ensure MongoDB Atlas allows connections from your hosting IP
3. Deploy the backend code

### Frontend Deployment (e.g., Vercel, Netlify)
1. Build the frontend: `npm run build`
2. Update `VITE_API_BASE_URL` to point to your deployed backend
3. Deploy the `dist` folder

## 📝 Notes

- Make sure CORS is properly configured (already set up in `server.js`)
- The JWT secret should be a strong, random string in production
- MongoDB Atlas connection string should include your database credentials
- All passwords are hashed using bcrypt before storage

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Coding! 💎**

