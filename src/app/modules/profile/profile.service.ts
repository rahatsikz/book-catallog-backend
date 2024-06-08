import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const getProfileData = async (token: string): Promise<User> => {
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );
  const result = await prisma.user.findUnique({
    where: {
      id: verifiedUser.userId,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return result;
};

export const ProfileService = {
  getProfileData,
};
