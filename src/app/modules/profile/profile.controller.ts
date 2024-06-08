import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProfileService } from "./profile.service";
import httpStatus from "http-status";

const getProfileData = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  const result = await ProfileService.getProfileData(token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile data fetched successfully",
    data: result,
  });
});

export const ProfileController = {
  getProfileData,
};
