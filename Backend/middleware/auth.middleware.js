import { verifyToken } from "../utils/jwt.js";
import User from "../models/user.model.js";
import logger from "../utils/logger.js";

export const protect = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Not authorized, no token",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = verifyToken(token);
    logger.debug(`Token decoded successfully for user: ${decoded.userId}`);

    // Get user from token
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      logger.debug(`User not found for ID: ${decoded.userId}`);
      return res.status(401).json({
        status: "error",
        message: "Not authorized, user not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "error",
        message: "Token has expired",
      });
    }
    return res.status(401).json({
      status: "error",
      message: "Not authorized, token failed",
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    // Flatten roles array in case it's passed as an array
    const allowedRoles = roles.flat();

    if (!allowedRoles.includes(req.user.role)) {
      logger.debug(
        `Authorization failed - User role: ${
          req.user.role
        }, Required roles: ${allowedRoles.join(", ")}`
      );
      return res.status(403).json({
        status: "error",
        message: "Unauthorized access",
      });
    }

    next();
  };
};
