import express from "express";
import { BookController } from "./book.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/create-book", auth("admin"), BookController.insertIntoDB);

router.get("/", BookController.getAllFromDB);
router.get("/:categoryId/category", BookController.getByCateogryIdFromDB);
router.get("/:id", BookController.getByIdFromDB);

export const BookRoutes = router;
