import User from "../models/user.model.js";
import logger from "../utils/logger.js";
import bcrypt from "bcryptjs";

export const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    logger.error(`Error fetching user: ${error.message}`);
    throw error;
  }
};

export const updateUser = async (id, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    logger.error(`Error deleting user: ${error.message}`);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await User.find().select("-password");
    return users;
  } catch (error) {
    logger.error(`Error fetching users: ${error.message}`);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return user;
  } catch (error) {
    logger.error(`Error during login: ${error.message}`);
    throw error;
  }
};

const userService = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  login,
};

export default userService;
