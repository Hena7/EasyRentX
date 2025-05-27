import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../server.js";
import User from "../models/user.model.js";

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

beforeEach(async () => {
  await User.deleteMany({});
});

describe("User API", () => {
  const userData = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  };

  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const res = await request(app).post("/api/users").send(userData);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(userData.name);
      expect(res.body.data.email).toBe(userData.email);
      expect(res.body.data.password).toBeUndefined();
    });

    it("should not create user with invalid email", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({ ...userData, email: "invalid-email" });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe("GET /api/users", () => {
    it("should get all users", async () => {
      await User.create(userData);

      const res = await request(app).get("/api/users");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].email).toBe(userData.email);
    });
  });

  describe("GET /api/users/:id", () => {
    it("should get user by id", async () => {
      const user = await User.create(userData);

      const res = await request(app).get(`/api/users/${user._id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe(userData.email);
    });

    it("should return 404 for non-existent user", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/users/${fakeId}`);

      expect(res.status).toBe(404);
    });
  });
});

describe("Auth API", () => {
  const registerData = {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
    role: "user",
  };

  describe("POST /api/auth/register", () => {
    it("should register a new user successfully", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send(registerData);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("User registered successfully");
      expect(res.body.token).toBeDefined();
      expect(res.body.user).toMatchObject({
        name: registerData.name,
        email: registerData.email,
        role: registerData.role,
      });
      expect(res.body.user.id).toBeDefined();
      expect(res.body.user.password).toBeUndefined();
    });

    it("should not register user with invalid email", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ ...registerData, email: "invalid-email" });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should not register user with password less than 6 characters", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ ...registerData, password: "12345" });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should not register user with invalid role", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ ...registerData, role: "invalid-role" });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
