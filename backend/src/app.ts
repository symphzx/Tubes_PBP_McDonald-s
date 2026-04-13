import express, { Application } from "express";
import menuRoutes from "./routes/menuRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

const app: Application = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use("/menu", menuRoutes);
app.use("/auth", authRoutes);
app.use("/uploads", express.static("uploads"));

export default app;
