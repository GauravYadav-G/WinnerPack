import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRouter from "./routes/auth";
import articlesRouter from "./routes/articles";
import contentRouter from "./routes/content";
import inquiriesRouter from "./routes/inquiries";
import productsRouter from "./routes/products";
import uploadRouter from "./routes/upload";
import categoriesRouter from "./routes/categories";
import databaseRouter from "./routes/database";

try {
  process.loadEnvFile?.();
} catch (_) {}

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const allowedFrontendOrigins = FRONTEND_URL.split(",").map((origin) => origin.trim()).filter(Boolean);
const isDevelopment = process.env.NODE_ENV !== "production";

// Preserve the original HTTPS protocol when deployed behind a reverse proxy.
app.set("trust proxy", 1);

// ─── Middleware ────────────────────────────────────────────────────────────────

// CORS: allow frontend origin with credentials so cross-origin cookies work
app.use(
  cors({
    origin(origin, callback) {
      const isLocalDevelopmentOrigin =
        isDevelopment && /^http:\/\/(?:localhost|127\.0\.0\.1):\d+$/.test(origin || "");

      if (!origin || allowedFrontendOrigins.includes(origin) || isLocalDevelopmentOrigin) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true, // required for SameSite=None cookies cross-origin
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded files as static assets (so /uploads/<filename> works)
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "public", "uploads"), {
    maxAge: "1y",
    immutable: true,
  })
);

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use("/api/admin/auth", authRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/content", contentRouter);
app.use("/api/inquiries", inquiriesRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/database", databaseRouter);

// ─── Health check ─────────────────────────────────────────────────────────────

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`winnerpack-backend listening on port ${PORT}`);
  console.log(`CORS allowed origins: ${allowedFrontendOrigins.join(", ")}`);
});

export default app;
