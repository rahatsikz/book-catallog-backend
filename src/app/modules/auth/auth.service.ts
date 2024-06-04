import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IUserLogin } from "./auth.interface";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const createUser = async (userData: User) => {
  const result = await prisma.user.create({
    data: userData,
  });
  return result;
};

const loginUser = async (payload: IUserLogin) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.password !== password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const { role, id } = user;

  const accessToken = jwtHelpers.createToken(
    {
      role,
      userId: id,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return accessToken;
};

export const AuthService = {
  createUser,
  loginUser,
};
