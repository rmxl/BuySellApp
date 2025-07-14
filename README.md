## Buy-Sell-Rent Website 

A full-featured e-commerce platform built with React and Node.js, designed for the IIIT Hyderabad community. It enables users to buy, sell, and rent items securely. Key features include user authentication, product and inventory management, a persistent shopping cart, order tracking, and AI-powered support for seamless user experience.


## Features

### Authentication & User Management
- Secure user registration and login with JWT
- Email validation for `@students.iiit.ac.in` and `@research.iiit.ac.in`
- View and edit user profiles
- Password change with bcrypt hashing
- Persistent sessions via localStorage

### Product Management
- Browse available items by category
- Detailed product pages with escriptions, and prices
- Filter and sort by categories
- View seller contact and profile information

### Shopping Experience
- Persistent shopping cart with add/remove functionality
- Advanced search with filters and sorting
- Upload and display product images
- Transparent seller-defined pricing

### Selling & Renting
- List items for sale or rent
- Flexible pricing options
- Manage inventory and product availability
- Handle orders and communicate with buyers

### Order Management
- Track orders from placement to delivery
- View full order history for buyers and sellers
- Real-time order status updates
- Manage deliveries and order fulfillment

### AI-Powered Support
- Google Gemini chatbot integration
- Automated responses to common queries
- Assist users with navigation and support

### User Interface
- Clean, modern, and intuitive UI
- Protected routes for secure navigation
- Centralized dashboard with quick access to features
## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB setup)
- Google Generative AI API key
## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB Atlas account (or local MongoDB installation)
- Google Generative AI API key

---

## Installation

#### Clone the Repository

```bash
git clone <repository-url>
cd Buy-Sell-Rent-Website
```

#### Install Frontend Dependencies

```bash
cd frontend
npm install
```

#### Install Backend Dependencies

```bash
cd ../backend
npm install
```

---

### Environment Setup

Create a `.env` file in the `backend` directory:

```env
JWT_SECRET=your_jwt_secret_key_here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopspot
GEMINI_API_KEY=your_google_generative_ai_api_key
CAS_URL=your_cas_url_if_using_cas_authentication
```

---

### Database Configuration

Update the MongoDB connection string in `backend/index.js`:

```js
const mongoURI = "your_mongodb_connection_string";
```

---

### Running the Application

#### Start the Backend Server

```bash
cd backend
npm run dev
```

- Backend will start on: `http://localhost:5000`

#### Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

- Frontend will start on: `http://localhost:5173`

---

### Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

