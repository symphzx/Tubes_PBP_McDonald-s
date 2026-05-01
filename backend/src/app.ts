import express, { Application } from "express";
import apiRoutes from "./routes/index.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app: Application = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());

app.use(express.json());

app.use( "/uploads", express.static(path.join(process.cwd(), "uploads")) );

app.use("/api", apiRoutes);

export default app;
