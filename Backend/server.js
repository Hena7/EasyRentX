import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";
import logger from "./utils/logger.js";
import net from "net";

const isPortInUse = (port) => {
  return new Promise((resolve) => {
    const server = net
      .createServer()
      .once("error", () => resolve(true))
      .once("listening", () => {
        server.close();
        resolve(false);
      })
      .listen(port);
  });
};

const findAvailablePort = async (startPort) => {
  let port = startPort;
  while (await isPortInUse(port)) {
    port++;
  }
  return port;
};

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Check if port is available, if not find an available port
    const port = await findAvailablePort(env.PORT);
    if (port !== parseInt(env.PORT)) {
      logger.warn(`Port ${env.PORT} is in use, using port ${port} instead`);
    }

    // Start server
    const server = app.listen(port, () => {
      logger.info(`Server running in ${env.NODE_ENV} mode on port ${port}`);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      logger.error("Unhandled Rejection! 💥 Shutting down...");
      logger.error("Error details:", {
        name: err.name,
        message: err.message,
        stack: err.stack,
      });

      // Give time for pending requests to complete
      server.close(() => {
        logger.info("Process terminated due to unhandled promise rejection");
        process.exit(1);
      });
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (err) => {
      logger.error("Uncaught Exception! 💥 Shutting down...");
      logger.error("Error details:", {
        name: err.name,
        message: err.message,
        stack: err.stack,
      });

      // Give time for pending requests to complete
      server.close(() => {
        logger.info("Process terminated due to uncaught exception");
        process.exit(1);
      });
    });

    // Handle SIGTERM
    process.on("SIGTERM", () => {
      logger.info("SIGTERM received. Shutting down gracefully...");
      server.close(() => {
        logger.info("Process terminated due to SIGTERM");
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error("Error starting server:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
};

// Only start the server if this file is run directly
if (process.env.NODE_ENV !== "test") {
  startServer();
}

export { app, startServer };
