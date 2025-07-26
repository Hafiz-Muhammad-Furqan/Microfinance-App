# <div align="center">Microfinance Loan Management System</div>
<p align="center">
  <strong>A Complete MERN Stack Solution for Microfinance Loan Processing</strong><br>
  Built with MongoDB, Express.js, React.js, and Node.js
</p>

## 🚀 Live Demo
Experience the application live: [https://microfinance-app.netlify.app](https://microfinance-app.netlify.app)

## ✨ Features

- **User Authentication System** - Secure JWT-based login and registration
- **Role-Based Access Control** - Separate interfaces for users and administrators
- **Loan Request Management** - Submit loan applications with comprehensive validation
- **Admin Dashboard** - Manage and process loan requests efficiently
- **Real-time Loan Tracking** - Monitor loan status (Pending, Approved, Rejected)
- **Responsive Design** - Optimized for desktop and mobile devices using Tailwind CSS
- **Secure API Integration** - RESTful APIs with proper authentication middleware

## 🛠️ Technologies Used

| Category    | Technologies                                    |
| ----------- | ---------------------------------------------- |
| Frontend    | React.js, Vite, Tailwind CSS, React Router    |
| Backend     | Node.js, Express.js, JWT Authentication       |
| Database    | MongoDB Atlas                                  |
| Deployment  | Netlify (Frontend), Vercel (Backend)          |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hafiz-Muhammad-Furqan/Microfinance-App.git
   cd Microfinance-App
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Environment Configuration**

   - Rename `.env.sample` to `.env`
   - Fill in the required values:
     
   **Backend Environment Variables** (Backend/.env)
   ```env
   MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
   PORT=3000
   JWT_SECRET=YOUR_JWT_Secret
   Email=admin@gmail.com
   Password=admin@123
   ```

   **Frontend Environment Variables** (Frontend/.env)
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

### Running the Application

**Start Backend Server**
```bash
cd Backend
node server.js
# Server will run on http://localhost:3000
```

**Start Frontend Development Server**
```bash
cd Frontend
npm run dev
# Application will run on http://localhost:5173
```

## 📂 Project Structure

```
Microfinance-App/
├── Frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React context providers
│   │   ├── pages/            # Application pages
│   │   ├── routes/           # Route configurations
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx           # Main application component
│   │   ├── index.css         # Global styles
│   │   └── main.jsx          # Entry point
│   ├── .env.sample           # Environment variables template
│   ├── eslint.config.js      # ESLint configuration
│   ├── index.html            # HTML template
│   ├── netlify.toml          # Netlify deployment config
│   ├── package.json          # Frontend dependencies
│   ├── package-lock.json     # Lock file
│   └── vite.config.js        # Vite configuration
├── Backend/
│   ├── controllers/          # Request handlers
│   ├── db/                   # Database configuration
│   ├── middlewares/          # Custom middleware
│   ├── models/               # MongoDB schemas
│   ├── node_modules/
│   ├── routes/               # API routes
│   ├── utils/                # Backend utilities
│   ├── .env.sample           # Environment variables template
│   ├── package.json          # Backend dependencies
│   ├── package-lock.json     # Lock file
│   ├── server.js             # Main server file
│   └── vercel.json           # Vercel deployment config
└── README.md                 # Project documentation
```

## 🔐 Default Admin Credentials

For testing purposes, use these credentials to access the admin panel:
- **Email:** admin@gmail.com
- **Password:** admin@123

## 🎯 Key Features Breakdown

### User Features
- **Registration & Login** - Create account and secure authentication
- **Loan Application** - Submit loan requests with Details
- **Dashboard** - View loan history and current status

### Admin Features
- **Admin Dashboard** - Overview of all loan applications
- **Loan Processing** - Approve or reject loan requests
- **User Management** - View user details and loan history

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt encryption for user passwords
- **Route Protection** - Middleware to protect sensitive routes
- **Input Validation** - Server-side validation for all inputs
- **CORS Configuration** - Proper cross-origin resource sharing setup

## 📱 Responsive Design

The application is fully responsive and provides an optimal experience across:
- Desktop computers
- Tablets
- Mobile devices
- Various screen resolutions

## 🚀 Deployment

### Frontend (Netlify)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Backend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy using the provided `vercel.json` configuration

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🐛 Issues and Support

If you encounter any issues or have suggestions for improvements:

1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Contact the developer directly

## 📧 Contact

For questions, suggestions, or contributions:

**Hafiz Muhammad Furqan**
- Email: [hafizfurqan.dev@gmail.com](mailto:hafizfurqan.dev@gmail.com)
- GitHub: [https://github.com/Hafiz-Muhammad-Furqan](https://github.com/Hafiz-Muhammad-Furqan)

Project Repository: [https://github.com/Hafiz-Muhammad-Furqan/Microfinance-App](https://github.com/Hafiz-Muhammad-Furqan/Microfinance-App)

---

<div align="center">
  <strong>Built with ❤️ by Hafiz Muhammad Furqan</strong>
</div>
