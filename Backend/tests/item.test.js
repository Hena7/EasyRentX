import request from "supertest";
import app from "../server.js";
import { createTestUser, generateTestToken } from "./helpers.js";
import Item from "../models/item.model.js";

describe("Item Management Endpoints", () => {
  describe("GET /items", () => {
    it("should get all items", async () => {
      const user = await createTestUser();
      const token = generateTestToken(user);

      // Create a test item
      await Item.create({
        name: "Test Item",
        description: "Test Description",
        price: 100,
        owner: user._id,
      });

      const res = await request(app)
        .get("/items")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /items/search", () => {
    it("should search items by query", async () => {
      const user = await createTestUser();
      const token = generateTestToken(user);

      // Create test items
      await Item.create({
        name: "Test Item 1",
        description: "Test Description 1",
        price: 100,
        owner: user._id,
      });

      await Item.create({
        name: "Another Item",
        description: "Another Description",
        price: 200,
        owner: user._id,
      });

      const res = await request(app)
        .get("/items/search?q=Test")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
      expect(res.body[0].name).toBe("Test Item 1");
    });
  });

  describe("GET /items/:id", () => {
    it("should get item by id", async () => {
      const user = await createTestUser();
      const token = generateTestToken(user);

      const item = await Item.create({
        name: "Test Item",
        description: "Test Description",
        price: 100,
        owner: user._id,
      });

      const res = await request(app)
        .get(`/items/${item._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "Test Item");
    });

    it("should return 404 for non-existent item", async () => {
      const user = await createTestUser();
      const token = generateTestToken(user);

      const res = await request(app)
        .get("/items/507f1f77bcf86cd799439011")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });

  describe("POST /items", () => {
    it("should create new item", async () => {
      const user = await createTestUser();
      const token = generateTestToken(user);

      const res = await request(app)
        .post("/items")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "New Item",
          description: "New Description",
          price: 150,
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("name", "New Item");
      expect(res.body).toHaveProperty("owner", user._id.toString());
    });

    it("should not create item without authentication", async () => {
      const res = await request(app).post("/items").send({
        name: "New Item",
        description: "New Description",
        price: 150,
      });

      expect(res.status).toBe(401);
    });
  });

  describe("PUT /items/:id", () => {
    it("should update item when owner", async () => {
      const user = await createTestUser();
      const token = generateTestToken(user);

      const item = await Item.create({
        name: "Test Item",
        description: "Test Description",
        price: 100,
        owner: user._id,
      });

      const res = await request(app)
        .put(`/items/${item._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Updated Item",
          price: 200,
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "Updated Item");
      expect(res.body).toHaveProperty("price", 200);
    });

    it("should not update item when not owner", async () => {
      const user1 = await createTestUser();
      const user2 = await createTestUser();
      const token2 = generateTestToken(user2);

      const item = await Item.create({
        name: "Test Item",
        description: "Test Description",
        price: 100,
        owner: user1._id,
      });

      const res = await request(app)
        .put(`/items/${item._id}`)
        .set("Authorization", `Bearer ${token2}`)
        .send({
          name: "Updated Item",
        });

      expect(res.status).toBe(403);
    });
  });

  describe("DELETE /items/:id", () => {
    it("should delete item when owner", async () => {
      const user = await createTestUser();
      const token = generateTestToken(user);

      const item = await Item.create({
        name: "Test Item",
        description: "Test Description",
        price: 100,
        owner: user._id,
      });

      const res = await request(app)
        .delete(`/items/${item._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);

      const deletedItem = await Item.findById(item._id);
      expect(deletedItem).toBeNull();
    });

    it("should not delete item when not owner", async () => {
      const user1 = await createTestUser();
      const user2 = await createTestUser();
      const token2 = generateTestToken(user2);

      const item = await Item.create({
        name: "Test Item",
        description: "Test Description",
        price: 100,
        owner: user1._id,
      });

      const res = await request(app)
        .delete(`/items/${item._id}`)
        .set("Authorization", `Bearer ${token2}`);

      expect(res.status).toBe(403);
    });
  });
});
