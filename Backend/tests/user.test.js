import request from "supertest";
import app from "../server.js";
import User from "../models/user.model.js";
import {
  createTestUser,
  createTestAdmin,
  generateTestToken,
  createTestAdminWithToken,
} from "./helpers.js";

describe("User Endpoints", () => {
  let adminToken;
  let adminUser;

  const testUser = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    role: "user",
  };

  beforeEach(async () => {
    await User.deleteMany({});

    // Create admin user
    const adminRes = await request(app).post("/api/auth/register").send({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });

    adminToken = adminRes.body.data.token;
    adminUser = adminRes.body.data.user;
  });

  describe("POST /api/users", () => {
    it("should create a new user when admin", async () => {
      const res = await request(app)
        .post("/api/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(testUser);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toHaveProperty("id");
      expect(res.body.data.user.name).toBe(testUser.name);
      expect(res.body.data.user.email).toBe(testUser.email);
    });

    it("should not create user without admin role", async () => {
      const userRes = await request(app)
        .post("/api/auth/register")
        .send(testUser);
      const userToken = userRes.body.data.token;

      const res = await request(app)
        .post("/api/users")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          name: "Another User",
          email: "another@example.com",
          password: "password123",
        });

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });
  });

  describe("GET /api/users", () => {
    beforeEach(async () => {
      await request(app)
        .post("/api/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(testUser);
    });

    it("should get all users when admin", async () => {
      const res = await request(app)
        .get("/api/users")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.users)).toBe(true);
      expect(res.body.data.users.length).toBe(2); // Admin + test user
    });

    it("should not get users without admin role", async () => {
      const userRes = await request(app)
        .post("/api/auth/register")
        .send(testUser);
      const userToken = userRes.body.data.token;

      const res = await request(app)
        .get("/api/users")
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });
  });

  describe("GET /api/users/:id", () => {
    let testUserId;

    beforeEach(async () => {
      const createRes = await request(app)
        .post("/api/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(testUser);
      testUserId = createRes.body.data.user.id;
    });

    it("should get user by id when admin", async () => {
      const res = await request(app)
        .get(`/api/users/${testUserId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.id).toBe(testUserId);
      expect(res.body.data.user.email).toBe(testUser.email);
    });

    it("should not get user without admin role", async () => {
      const userRes = await request(app)
        .post("/api/auth/register")
        .send(testUser);
      const userToken = userRes.body.data.token;

      const res = await request(app)
        .get(`/api/users/${testUserId}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });
  });

  describe("PUT /api/users/:id", () => {
    let testUserId;

    beforeEach(async () => {
      const createRes = await request(app)
        .post("/api/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(testUser);
      testUserId = createRes.body.data.user.id;
    });

    it("should update user when admin", async () => {
      const updateData = {
        name: "Updated User",
        email: "updated@example.com",
      };

      const res = await request(app)
        .put(`/api/users/${testUserId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.name).toBe(updateData.name);
      expect(res.body.data.user.email).toBe(updateData.email);
    });

    it("should not update user without admin role", async () => {
      const userRes = await request(app)
        .post("/api/auth/register")
        .send(testUser);
      const userToken = userRes.body.data.token;

      const res = await request(app)
        .put(`/api/users/${testUserId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ name: "Updated User" });

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });
  });

  describe("DELETE /api/users/:id", () => {
    let testUserId;

    beforeEach(async () => {
      const createRes = await request(app)
        .post("/api/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(testUser);
      testUserId = createRes.body.data.user.id;
    });

    it("should delete user when admin", async () => {
      const res = await request(app)
        .delete(`/api/users/${testUserId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Verify user is deleted
      const getRes = await request(app)
        .get(`/api/users/${testUserId}`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(getRes.status).toBe(404);
    });

    it("should not delete user without admin role", async () => {
      const userRes = await request(app)
        .post("/api/auth/register")
        .send(testUser);
      const userToken = userRes.body.data.token;

      const res = await request(app)
        .delete(`/api/users/${testUserId}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
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

describe("User Management Endpoints", () => {
  describe("GET /api/users", () => {
    it("should get all users when admin", async () => {
      const { admin, token } = await createTestAdminWithToken();
      await createTestUser();

      const res = await request(app)
        .get("/api/users")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data.users)).toBe(true);
      expect(res.body.data.users.length).toBeGreaterThan(0);
    });

    it("should not get users when not admin", async () => {
      const user = await createTestUser();
      const token = generateTestToken(user);

      const res = await request(app)
        .get("/api/users")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(403);
    });
  });

  describe("GET /users/:id", () => {
    it("should get user by id when admin", async () => {
      const { admin, token } = await createTestAdminWithToken();
      const testUser = await createTestUser();

      const res = await request(app)
        .get(`/api/users/${testUser._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.user).toHaveProperty("email", testUser.email);
    });

    it("should not get user when not admin", async () => {
      const user = await createTestUser();
      const token = generateTestToken(user);
      const testUser = await createTestUser();

      const res = await request(app)
        .get(`/api/users/${testUser._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(403);
    });
  });

  describe("POST /users", () => {
    it("should create new user when admin", async () => {
      const { admin, token } = await createTestAdminWithToken();

      const res = await request(app)
        .post("/api/users")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "New User",
          email: "newuser@example.com",
          password: "password123",
          role: "user",
        });

      expect(res.status).toBe(201);
      expect(res.body.data.user).toHaveProperty("email", "newuser@example.com");
    });

    it("should not create user when not admin", async () => {
      const user = await createTestUser();
      const token = generateTestToken(user);

      const res = await request(app)
        .post("/api/users")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "New User",
          email: "newuser@example.com",
          password: "password123",
          role: "user",
        });

      expect(res.status).toBe(403);
    });
  });

  describe("PUT /users/:id", () => {
    it("should update user when admin", async () => {
      const { admin, token } = await createTestAdminWithToken();
      const testUser = await createTestUser();

      const res = await request(app)
        .put(`/api/users/${testUser._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Updated Name",
          email: "updated@example.com",
        });

      expect(res.status).toBe(200);
      expect(res.body.data.user).toHaveProperty("name", "Updated Name");
    });

    it("should not update user when not admin", async () => {
      const user = await createTestUser();
      const token = generateTestToken(user);
      const testUser = await createTestUser();

      const res = await request(app)
        .put(`/api/users/${testUser._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Updated Name",
        });

      expect(res.status).toBe(403);
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete user when admin", async () => {
      const { admin, token } = await createTestAdminWithToken();
      const testUser = await createTestUser();

      const res = await request(app)
        .delete(`/api/users/${testUser._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);

      const deletedUser = await User.findById(testUser._id);
      expect(deletedUser).toBeNull();
    });

    it("should not delete user when not admin", async () => {
      const user = await createTestUser();
      const token = generateTestToken(user);
      const testUser = await createTestUser();
      const res = await request(app)
        .delete(`/api/users/${testUser._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(403);
    });
  });
});
