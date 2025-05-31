import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const generateTestToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "test-secret",
    { expiresIn: "1h" }
  );
};

export const createTestUser = async (role = "user") => {
  const user = await User.create({
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    role,
  });
  return user;
};

export const createTestAdmin = async () => {
  return createTestUser("admin");
};
