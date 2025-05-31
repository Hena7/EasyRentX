import request from "supertest";
import app from "../server.js";
import { createTestUser, generateTestToken } from "./helpers.js";
import User from "../models/user.model.js";

describe("Auth Endpoints", () => {
  describe("POST /auth/register", () => {
    it("should register a new user successfully", async () => {
      const res = await request(app).post("/auth/register").send({
        name: "New User",
        email: "newuser@example.com",
        password: "password123",
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("email", "newuser@example.com");
    });

    it("should not register user with existing email", async () => {
      await createTestUser();

      const res = await request(app).post("/auth/register").send({
        name: "Another User",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(400);
    });
  });

  describe("POST /auth/login", () => {
    beforeEach(async () => {
      await createTestUser();
    });

    it("should login user successfully", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should not login with wrong password", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(res.status).toBe(401);
    });
  });

  describe("GET /auth/profile", () => {
    it("should get user profile when authenticated", async () => {
      const user = await createTestUser();
      const token = generateTestToken(user);

      const res = await request(app)
        .get("/auth/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("email", user.email);
    });

    it("should not get profile without authentication", async () => {
      const res = await request(app).get("/auth/profile");

      expect(res.status).toBe(401);
    });
  });

  describe("PUT /auth/profile", () => {
    it("should update user profile when authenticated", async () => {
      const user = await createTestUser();
      const token = generateTestToken(user);

      const res = await request(app)
        .put("/auth/profile")
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Updated",
          lastName: "User",
          phoneNumber: "1234567890",
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("firstName", "Updated");
    });
  });
});
