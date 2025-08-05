import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routesUsers from "./modules/v1/users/users.routes.js";
import routesTasks from "./modules/v1/tasks/tasks.routes.js";
import morgan from "morgan";


const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(routesUsers);
app.use(routesTasks);

export default app;
