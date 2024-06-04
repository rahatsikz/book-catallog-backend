import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth("admin"), UserController.getAllFromDB);
router.get("/:id", auth("admin"), UserController.getByIdFromDB);

export const UserRoutes = router;
