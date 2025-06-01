import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import itemRoutes from "./routes/item.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import logger from "./utils/logger.js";

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));

// Compression
app.use(compression());

// Logging
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EasyRentX API" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Error handling
app.use(errorHandler);

export default app;
