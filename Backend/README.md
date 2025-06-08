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

## Standards Compliance

This project adheres to the following ISO standards:

### ISO/IEC 27001:2013 - Information Security Management

- Secure authentication and authorization
- Data encryption in transit and at rest
- Regular security audits and monitoring
- Access control and user management

### ISO/IEC 25010:2011 - Software Product Quality

- Performance efficiency
- Compatibility
- Usability
- Reliability
- Security
- Maintainability
- Portability

### ISO 8601 - Date and Time Formats

- Consistent date/time handling across the application
- Standardized timestamp formats
- UTC timezone usage for data storage

### ISO/IEC 9126 - Software Quality Characteristics

- Functionality
- Reliability
- Usability
- Efficiency
- Maintainability
- Portability

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Hena7/EasyRentX.git
cd EasyRentX/Backend
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

The project uses Jest for testing and MongoDB Memory Server for database testing.

### MongoDB Memory Server Setup

To use MongoDB Memory Server for testing:

1. Install the required dependencies:

```bash
npm install --save-dev mongodb-memory-server
```

2. Create a test database setup file (e.g., `test/setup.js`):

```javascript
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongod;

// Connect to the in-memory database
module.exports.connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
};

// Drop database, close the connection and stop mongod
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

// Clear all data in the database
module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
```

3. Use in your test files:

```javascript
const dbHandler = require("./setup");

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());
```

This setup provides an isolated MongoDB instance for each test suite, ensuring your tests don't interfere with each other or your development database.

### Test Setup

The test environment uses:

- Jest as the test runner
- MongoDB Memory Server for in-memory database testing
- Supertest for HTTP assertions

### Running Tests

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate test coverage report:

```bash
npm run test:coverage
```

### Running Specific Tests

You can run specific test files or test suites using Jest's pattern matching:

```bash
# Run tests in a specific file
npm test -- auth.test.js

# Run tests matching a pattern
npm test -- -t "should register a new user"

# Run tests in a specific directory
npm test -- integration/

# Run tests with a specific name pattern
npm test -- -t "auth"

# Run tests with coverage for a specific file
npm test -- auth.test.js --coverage
```

### Test Structure

```
├── __tests__/           # Test directory
│   ├── integration/     # Integration tests
│   │   ├── auth.test.js
│   │   ├── users.test.js
│   │   └── items.test.js
│   └── unit/           # Unit tests
│       ├── services/
│       └── utils/
```

### Writing Tests

Example test file structure:

```javascript
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import app from "../server";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Auth Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("token");
  });
});
```

### Test Coverage

The project aims for high test coverage:

- Unit tests for services and utilities
- Integration tests for API endpoints
- Database operations using MongoDB Memory Server
- Authentication and authorization flows
- Input validation
- Error handling

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
