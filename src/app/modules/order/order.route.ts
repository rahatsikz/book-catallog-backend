import express from "express";
import auth from "../../middlewares/auth";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/create-order", auth("customer"), OrderController.insertIntoDB);

export const OrderRoutes = router;
