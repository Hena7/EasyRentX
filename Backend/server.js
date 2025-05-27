import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import connectDB from "./config/database.js";
import logger from "./utils/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import routes from "./routes/index.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EasyRentX API" });
});

// API Routes
app.use("/api", routes);

// Error handling middleware
app.use(errorHandler);

// Function to start the server
const startServer = async () => {
  try {
    // MongoDB Connection
    await connectDB();

    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      logger.info(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      logger.error(`Error: ${err.message}`);
      // Close server & exit process
      console.log("Unhandled promise rejection:", err);
      server.close(() => process.exit(1));
    });

    return server;
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

// Only start the server if this file is run directly
if (process.env.NODE_ENV !== "test") {
  console.log("Starting server...");
  startServer();
}

export { app, startServer };
