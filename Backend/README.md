# EasyRentX Backend

A robust backend server for the EasyRentX rental platform, built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication
- 👥 User Management
- 🏷️ Item/Rental Management
- 🔍 Search Functionality
- 📝 Input Validation with Zod
- 🛡️ Security Best Practices
- 📊 Error Handling
- 📝 Logging System

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for Authentication
- Zod for Validation
- Winston for Logging
- Jest for Testing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/easyrentx-backend.git
cd easyrentx-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

4. Start the development server:

```bash
npm run dev
```

## Project Structure

```
├── config/         # Configuration files
│   └── env.js     # Environment configuration
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
│   ├── auth.middleware.js    # Authentication middleware
│   ├── error.middleware.js   # Error handling middleware
│   └── validate.middleware.js # Zod validation middleware
├── models/         # Mongoose models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
│   ├── AppError.js # Custom error class
│   └── logger.js   # Logging utility
├── server.js       # Entry point
└── package.json    # Project metadata and dependencies
```

## API Documentation

### Authentication

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // optional
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Users

#### Create User (Admin Only)

```http
POST /api/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "role": "user"
}
```

#### Update User (Admin Only)

```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane.smith@example.com"
}
```

### Items

#### Create Item

```http
POST /api/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Mountain Bike",
  "description": "High-quality mountain bike in excellent condition",
  "price": 50,
  "category": "Sports",
  "condition": "like-new",
  "images": ["https://example.com/image1.jpg"],
  "location": {
    "address": "123 Main St",
    "city": "Boston",
    "state": "MA",
    "zipCode": "02108"
  }
}
```

#### Search Items

```http
GET /api/items/search?q=bike&category=Sports&minPrice=20&maxPrice=100
```

## Validation

The API uses Zod for request validation. All incoming requests are validated against predefined schemas:

### User Validation

- Name: 2-50 characters
- Email: Valid email format
- Password: Minimum 6 characters
- Role: "user" or "admin"

### Item Validation

- Title: 3-100 characters
- Description: 10-1000 characters
- Price: Positive number
- Condition: Enum of predefined values
- Location: Structured address object

## Error Handling

The API implements a centralized error handling system:

- Custom `AppError` class for application-specific errors
- Global error handler middleware
- Proper HTTP status codes
- Detailed error messages in development
- Sanitized error messages in production

## Logging

Winston logger is used for:

- Request logging
- Error logging
- Debug information
- Performance monitoring

## Testing

Run tests using:

```bash
npm test
```

For test coverage:

```bash
npm run test:coverage
```

## Security

- JWT Authentication
- Password Hashing with bcrypt
- CORS enabled
- Helmet for security headers
- Rate limiting
- Input validation
- XSS protection

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
