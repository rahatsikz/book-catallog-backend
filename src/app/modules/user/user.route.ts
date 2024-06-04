import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth("admin"), UserController.getAllFromDB);
router.get("/:id", auth("admin"), UserController.getByIdFromDB);

router.patch("/:id", auth("admin"), UserController.updateIntoDB);

router.delete("/:id", auth("admin"), UserController.deleteFromDB);

export const UserRoutes = router;
