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

### Items

- `GET /api/items` - Get all items
- `GET /api/items/search` - Search items with filters
- `GET /api/items/:id` - Get single item by ID
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Users (To be implemented)

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## Project Structure

```
├── controllers/     # Route controllers (business logic)
├── models/         # Database models
├── routes/         # API routes
├── middleware/     # Custom middleware
├── config/         # Configuration files
├── server.js       # Entry point
└── package.json    # Project metadata and dependencies
```

## Development Guidelines

1. Follow the existing code structure and naming conventions
2. Use async/await for handling asynchronous operations
3. Implement proper error handling
4. Add appropriate validation for request data
5. Keep the code DRY (Don't Repeat Yourself)

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CORS_ORIGIN` - Allowed origin for CORS
- `NODE_ENV` - Environment (development/production)