import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/users/create", userController.create);
userRoutes.get("/users/read", userController.read);
userRoutes.put("/users/update", userController.update);
userRoutes.delete("/users/delete", userController.delete);

export default userRoutes;
