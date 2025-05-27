import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import logger from "../utils/logger.js";

const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // Debug logging
    logger.debug(`Auth attempt - Token present: ${!!token}`);
    logger.debug(`JWT_SECRET present: ${!!process.env.JWT_SECRET}`);

    // Check if no token
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    logger.debug(`Token decoded successfully for user: ${decoded.userId}`);

    // Get user from database
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      logger.debug(`User not found for ID: ${decoded.userId}`);
      return res.status(401).json({ message: "User not found" });
    }

    // Add user info to request
    req.user = user;
    next();
  } catch (err) {
    logger.error(`Authentication error: ${err.message}`);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    res.status(401).json({ message: "Token is not valid" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Flatten roles array in case it's passed as an array
    const allowedRoles = roles.flat();

    if (!allowedRoles.includes(req.user.role)) {
      logger.debug(
        `Authorization failed - User role: ${
          req.user.role
        }, Required roles: ${allowedRoles.join(", ")}`
      );
      return res.status(403).json({ message: "Unauthorized access" });
    }

    next();
  };
};

export { authenticate, authorize };
