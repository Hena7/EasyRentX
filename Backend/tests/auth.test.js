import request from "supertest";
import app from "../server.js";
import User from "../models/user.model.js";

describe("Auth Endpoints", () => {
  const testUser = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  };

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/auth/register").send(testUser);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toHaveProperty("id");
      expect(res.body.data.user.name).toBe(testUser.name);
      expect(res.body.data.user.email).toBe(testUser.email);
      expect(res.body.data).toHaveProperty("token");
    });

    it("should not register a user with existing email", async () => {
      await User.create(testUser);

      const res = await request(app).post("/api/auth/register").send(testUser);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("User already exists");
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      await request(app).post("/api/auth/register").send(testUser);
    });

    it("should login with valid credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: testUser.email,
        password: testUser.password,
      });

      console.log("Login response:", res.body);
      console.log("Login status:", res.status);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toHaveProperty("id");
      expect(res.body.data.user.email).toBe(testUser.email);
      expect(res.body.data).toHaveProperty("token");
    });

    it("should not login with invalid password", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: testUser.email,
        password: "wrongpassword",
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Invalid credentials");
    });
  });

  describe("GET /api/auth/me", () => {
    let token;

    beforeEach(async () => {
      const registerRes = await request(app)
        .post("/api/auth/register")
        .send(testUser);
      console.log("Registration response:", registerRes.body);
      token = registerRes.body.data.token;

      // Verify user exists in database
      const user = await User.findOne({ email: testUser.email });
      console.log("User in database:", user);
    });

    it("should get current user profile", async () => {
      const res = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toHaveProperty("id");
      expect(res.body.data.user.email).toBe(testUser.email);
    });

    it("should not get profile without token", async () => {
      const res = await request(app).get("/api/auth/me");

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
});
