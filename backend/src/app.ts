import express, { Application } from "express";
import menuRoutes from "./routes/menu.routes";
import varianMenuRoutes from "./routes/varian_menu.routes";
import opsiMenuRoutes from "./routes/opsi_menu.routes"
import authRoutes from "./routes/auth.routes";
import kategoriRoutes from "./routes/kategori.routes";
import orderRoutes from "./routes/order.routes";
import userRoutes from "./routes/user.routes"
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app: Application = express();

app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use("/menu", menuRoutes);
app.use("/varian-menu", varianMenuRoutes);
app.use("/opsi-menu", opsiMenuRoutes)
app.use("/auth", authRoutes);
app.use("/kategori", kategoriRoutes);
app.use("/order", orderRoutes);
app.use("/user", userRoutes)
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

export default app;
