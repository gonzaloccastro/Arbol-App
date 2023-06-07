import { Router } from "express";
import {AdminRole} from "../constants/api.js";
import { checkRoles } from "../middlewares/auth.js";
import { UserController } from "../controllers/user.controller.js";

const router = Router();

router.get("/", UserController.getAllUsers)

router.put("/premium/:uid", checkRoles([AdminRole]),UserController.modifyUser);

router.get("/adminPanel", UserController.getAdminPanel)

router.delete("/deleteUser/:uid", UserController.deleteUser)

router.delete("/deleteOldUsers", UserController.deleteOldUsers)

export { router as userRouter}