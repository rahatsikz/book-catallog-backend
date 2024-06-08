import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user;
  const orderData = req.body;
  const result = await OrderService.insertIntoDB(userData, orderData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user;

  const result = await OrderService.getAllFromDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved successfully",
    data: result,
  });
});

export const OrderController = {
  insertIntoDB,
  getAllFromDB,
};
