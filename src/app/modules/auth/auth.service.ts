import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createUser = async (userData: User) => {
  const result = await prisma.user.create({
    data: userData,
  });
  return result;
};

export const AuthService = {
  createUser,
};
