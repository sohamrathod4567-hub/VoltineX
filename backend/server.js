import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", dataRoutes);

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal server error" });
});

export async function connectDatabase() {
  await mongoose.connect(process.env.MONGO_URI);
}

export default app;
