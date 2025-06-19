import request from "supertest";
import app from "../server.js";
import Item from "../models/item.model.js";
import User from "../models/user.model.js";

describe("Item Endpoints", () => {
  let userToken;
  let userId;
  let testItem;

  const testUser = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  };

  const itemData = {
    title: "Test Item",
    description: "This is a test item",
    price: 100,
    category: "Electronics",
    condition: "new",
    images: ["https://example.com/image.jpg"],
    location: {
      address: "123 Test St",
      city: "Test City",
      state: "TS",
      zipCode: "12345",
    },
  };

  beforeEach(async () => {
    await Item.deleteMany({});
    await User.deleteMany({});

    // Create test user
    const userRes = await request(app)
      .post("/api/auth/register")
      .send(testUser);
    userToken = userRes.body.data.token;
    userId = userRes.body.data.user.id;

    // Create test item
    const itemRes = await request(app)
      .post("/api/items")
      .set("Authorization", `Bearer ${userToken}`)
      .send(itemData);
    testItem = itemRes.body.data.item;
  });

  describe("POST /api/items", () => {
    it("should create a new item", async () => {
      const res = await request(app)
        .post("/api/items")
        .set("Authorization", `Bearer ${userToken}`)
        .send(itemData);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.item).toHaveProperty("id");
      expect(res.body.data.item.title).toBe(itemData.title);
      expect(res.body.data.item.description).toBe(itemData.description);
      expect(res.body.data.item.price).toBe(itemData.price);
      expect(res.body.data.item.category).toBe(itemData.category);
      expect(res.body.data.item.condition).toBe(itemData.condition);
      expect(res.body.data.item.images).toEqual(itemData.images);
      expect(res.body.data.item.location).toEqual(itemData.location);
      expect(res.body.data.item.owner).toBe(userId);
    });

    it("should not create item without authentication", async () => {
      const res = await request(app).post("/api/items").send(itemData);

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe("GET /api/items", () => {
    it("should get all items", async () => {
      const res = await request(app).get("/api/items");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.items)).toBe(true);
      expect(res.body.data.items.length).toBe(1);
      expect(res.body.data.items[0].title).toBe(itemData.title);
    });
  });

  describe("GET /api/items/:id", () => {
    it("should get item by id", async () => {
      const res = await request(app).get(`/api/items/${testItem.id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.item.id).toBe(testItem.id);
      expect(res.body.data.item.title).toBe(itemData.title);
    });

    it("should return 404 for non-existent item", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const res = await request(app).get(`/api/items/${fakeId}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe("PUT /api/items/:id", () => {
    it("should update item when owner", async () => {
      const updateData = {
        title: "Updated Item",
        price: 200,
      };

      const res = await request(app)
        .put(`/api/items/${testItem.id}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.item.title).toBe(updateData.title);
      expect(res.body.data.item.price).toBe(updateData.price);
    });

    it("should not update item when not owner", async () => {
      // Create another user
      const anotherUserRes = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Another User",
          email: "another@example.com",
          password: "password123",
        });
      const anotherUserToken = anotherUserRes.body.data.token;

      const res = await request(app)
        .put(`/api/items/${testItem.id}`)
        .set("Authorization", `Bearer ${anotherUserToken}`)
        .send({ title: "Updated Item" });

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });
  });

  describe("DELETE /api/items/:id", () => {
    it("should delete item when owner", async () => {
      const res = await request(app)
        .delete(`/api/items/${testItem.id}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Verify item is deleted
      const getRes = await request(app).get(`/api/items/${testItem.id}`);
      expect(getRes.status).toBe(404);
    });

    it("should not delete item when not owner", async () => {
      // Create another user
      const anotherUserRes = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Another User",
          email: "another@example.com",
          password: "password123",
        });
      const anotherUserToken = anotherUserRes.body.data.token;

      const res = await request(app)
        .delete(`/api/items/${testItem.id}`)
        .set("Authorization", `Bearer ${anotherUserToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });
  });

  describe("GET /api/items/search", () => {
    it("should search items by query", async () => {
      const res = await request(app)
        .get("/api/items/search")
        .query({ q: "test" });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.items)).toBe(true);
      expect(res.body.data.items.length).toBe(1);
      expect(res.body.data.items[0].title).toBe(itemData.title);
    });

    it("should search items by category", async () => {
      const res = await request(app)
        .get("/api/items/search")
        .query({ category: "Electronics" });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.items)).toBe(true);
      expect(res.body.data.items.length).toBe(1);
      expect(res.body.data.items[0].category).toBe("Electronics");
    });

    it("should search items by price range", async () => {
      const res = await request(app)
        .get("/api/items/search")
        .query({ minPrice: 50, maxPrice: 150 });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.items)).toBe(true);
      expect(res.body.data.items.length).toBe(1);
      expect(res.body.data.items[0].price).toBe(100);
    });
  });
});
