import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../.env") });

const testEnv = {
  NODE_ENV: "test",
  PORT: process.env.PORT || 3001,
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/easyrentx_test",
  JWT_SECRET: "test-jwt-secret-key-123", // Fixed secret for tests
  JWT_EXPIRES_IN: "1h",
  JWT_COOKIE_EXPIRES_IN: 1,
};

// For tests, we don't want to throw errors for missing env vars
// Instead, we'll use default values

export default testEnv;
