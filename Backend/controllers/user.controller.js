import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import env from "../config/env.js";

export const createUser = async (req, res, next) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return next(new AppError("Not authorized to create users", 403));
    }

    // Check if user with email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return next(new AppError("Email already registered", 400));
    }

    // Validate role
    if (req.body.role && !["user", "admin"].includes(req.body.role)) {
      return next(new AppError("Invalid role", 400));
    }

    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return next(new AppError("Not authorized to access this route", 403));
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return next(new AppError("Not authorized to access this route", 403));
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Check if email is being updated and if it's already taken
    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return next(new AppError("Email already registered", 400));
      }
    }

    console.log(req.body);

    // Validate role if being updated
    if (
      req.user.role !== "admin" &&
      req.user.role !== req.body.role &&
      !["user", "admin"].includes(req.body.role)
    ) {
      return next(new AppError("Invalid role", 400));
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return next(new AppError("Not authorized to access this route", 403));
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return next(new AppError("Not authorized to access this route", 403));
    }

    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      data: {
        users: users.map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email, password, name, role = "user" } = req.body;

    // Create user with additional fields
    const userData = {
      email,
      password,
      name,
      role,
    };

    const user = await userService.createUser(userData);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRES_IN,
      }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userService.login(email, password);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRES_IN,
      }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const updateData = {
      name,
    };

    const user = await userService.updateUser(req.user.userId, updateData);
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
