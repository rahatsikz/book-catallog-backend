import express from "express";
import auth from "../../middlewares/auth";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/create-order", auth("customer"), OrderController.insertIntoDB);

router.get("/", auth("admin", "customer"), OrderController.getAllFromDB);
router.get(
  "/:orderId",
  auth("admin", "customer"),
  OrderController.getByIdFromDB
);

export const OrderRoutes = router;
