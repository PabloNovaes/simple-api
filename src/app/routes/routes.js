import { Router } from "express";
import userRoutes from "./user-routes.js";

const routes = Router();

routes.use(userRoutes);

export default routes;
