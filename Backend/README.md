# EasyRentX Backend

Backend server for the EasyRentX rental platform built with Express.js and MongoDB.

## Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create environment file:

   - Copy `.env.example` to `.env`
   - Update the configuration values in `.env`

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user

  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "user" | "admin"
  }
  ```

- `POST /api/auth/login` - Login user

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- `GET /api/auth/profile` - Get user profile (requires authentication)

  - Headers: `Authorization: Bearer <token>`

- `PUT /api/auth/profile` - Update user profile (requires authentication)
  - Headers: `Authorization: Bearer <token>`
  ```json
  {
    "name": "string"
  }
  ```

### Items

- `GET /api/items` - Get all items
- `GET /api/items/search` - Search items with filters
- `GET /api/items/:id` - Get single item by ID
- `POST /api/items` - Create new item (requires authentication)
- `PUT /api/items/:id` - Update item (requires authentication)
- `DELETE /api/items/:id` - Delete item (requires authentication)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Register or login to get a JWT token
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer <your_token>
   ```

## Response Format

All API responses follow this format:

```json
{
  "success": true|false,
  "data": {}, // or
  "message": "string",
  "error": "string" // only present when success is false
}
```

## Project Structure

```
├── controllers/     # Route controllers (business logic)
├── models/         # Database models
├── routes/         # API routes
├── middleware/     # Custom middleware
│   ├── auth.js     # Authentication middleware
│   ├── errorHandler.js # Global error handler
│   └── validateRequest.js # Request validation
├── utils/          # Utility functions
│   ├── AppError.js # Custom error class
│   └── logger.js   # Logging utility
├── config/         # Configuration files
├── server.js       # Entry point
└── package.json    # Project metadata and dependencies
```

## Development Guidelines

1. Follow the existing code structure and naming conventions
2. Use async/await for handling asynchronous operations
3. Implement proper error handling using AppError class
4. Add appropriate validation for request data
5. Keep the code DRY (Don't Repeat Yourself)
6. Use the logger utility for debugging and error tracking

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CORS_ORIGIN` - Allowed origin for CORS
- `NODE_ENV` - Environment (development/production)
- `LOG_LEVEL` - Logging level (debug, info, warn, error)

## Error Handling

The API uses a centralized error handling system:

1. Custom `AppError` class for application-specific errors
2. Global error handler middleware
3. Proper HTTP status codes for different error types
4. Detailed error messages in development mode
5. Sanitized error messages in production mode
