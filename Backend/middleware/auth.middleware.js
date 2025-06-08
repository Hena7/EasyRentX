import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
import User from "../models/user.model.js";
import logger from "../utils/logger.js";
import env from "../config/env.js";

// Protect routes
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("Not authorized to access this route", 401));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, env.JWT_SECRET);

      // Get user from token
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return next(new AppError("User not found", 404));
      }

      // Add user to request object
      req.user = {
        _id: user._id,
        id: user._id, // Add id for backward compatibility
        role: decoded.role || user.role, // Use role from token if available, fallback to user.role
        name: user.name,
        email: user.email,
      };
      next();
    } catch (error) {
      logger.error("Token verification failed:", error);
      return next(new AppError("Not authorized to access this route", 401));
    }
  } catch (error) {
    next(error);
  }
};

// Authorize roles
export const authorize = (...roles) => {
  const destructuredRoles = [...roles];
  return (req, res, next) => {
    if (!destructuredRoles[0].includes(req.user.role)) {
      return next(
        new AppError(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
