import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import env from "../config/env.js";

export const generateTestToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
};

export const createTestUser = async (role = "user") => {
  const user = await User.create({
    name: "Test User",
    email: `test${Math.random()}@example.com`,
    password: "password123",
    role,
  });
  return user;
};

export const createTestAdmin = async () => {
  return createTestUser("admin");
};

export const createTestAdminWithToken = async () => {
  const admin = await createTestAdmin();
  const token = generateTestToken(admin);
  return { admin, token };
};
