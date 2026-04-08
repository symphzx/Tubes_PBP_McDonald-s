import express, { Application } from "express";
import menuRoutes from "./routes/menuRoutes";
import authRoutes from "./routes/authRoutes";

const app: Application = express();

app.use(express.json());

app.use("/menu", menuRoutes);
app.use("/auth", authRoutes);
app.use("/uploads", express.static("uploads"));

export default app;
