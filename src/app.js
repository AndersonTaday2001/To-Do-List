import express from "express";
import routesUsers from "./modules/v1/users/users.routes.js";
import routesTasks from "./modules/v1/tasks/tasks.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(routesUsers);
app.use(routesTasks);

export default app;
