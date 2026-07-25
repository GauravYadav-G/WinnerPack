import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRouter from "./routes/auth";
import articlesRouter from "./routes/articles";
import contentRouter from "./routes/content";
import inquiriesRouter from "./routes/inquiries";
import machinesRouter from "./routes/machines";
import productsRouter from "./routes/products";
import uploadRouter from "./routes/upload";

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// ─── Middleware ────────────────────────────────────────────────────────────────

// CORS: allow frontend origin with credentials so cross-origin cookies work
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true, // required for SameSite=None cookies cross-origin
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded files as static assets (so /uploads/<filename> works)
app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use("/api/admin/auth", authRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/content", contentRouter);
app.use("/api/inquiries", inquiriesRouter);
app.use("/api/machines", machinesRouter);
app.use("/api/products", productsRouter);
app.use("/api/upload", uploadRouter);

// ─── Health check ─────────────────────────────────────────────────────────────

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`winnerpack-backend listening on port ${PORT}`);
  console.log(`CORS allowed origin: ${FRONTEND_URL}`);
});

export default app;
