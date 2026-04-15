import express, { Application } from "express";
import menuRoutes from "./routes/menuRoutes";
import authRoutes from "./routes/authRoutes";
import kategoriRoutes from "./routes/kategoriRoutes";
import orderRoutes from "./routes/orderRoutes"
import cors from "cors";
import path from "path";

const app: Application = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use("/menu", menuRoutes);
app.use("/auth", authRoutes);
app.use("/kategori", kategoriRoutes);
app.use("/order", orderRoutes)
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

export default app;
