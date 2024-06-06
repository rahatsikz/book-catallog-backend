import express from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/create-category", auth("admin"), CategoryController.insertIntoDB);

router.get("/", CategoryController.getAllFromDB);
router.get("/:id", CategoryController.getByIdFromDB);

router.patch("/:id", auth("admin"), CategoryController.updateIntoDB);
router.delete("/:id", auth("admin"), CategoryController.deleteFromDB);

export const CategoryRoutes = router;
