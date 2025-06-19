import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import env from "../config/env.js";

let mongoServer;

// Set test environment
process.env.NODE_ENV = "test";

beforeAll(async () => {
  // Close any existing connections
  await mongoose.disconnect();

  // Create new in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Connect to the in-memory database
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Clean up
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clear all collections after each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});
