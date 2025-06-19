import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";
import { AppError } from "../middleware/error.middleware.js";

export const register = async (userData) => {
  const { email } = userData;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already registered", 400);
  }

  // Create user
  const user = await User.create(userData);

  // Generate token
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const login = async (email, password) => {
  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  // Check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  // Generate token
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};
