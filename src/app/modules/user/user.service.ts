import { User } from "@prisma/client";
import {
  excludeFromList,
  excludeFromObject,
} from "../../../shared/excludeFrom";
import prisma from "../../../shared/prisma";

const getAllFromDB = async () => {
  const result = await prisma.user.findMany({});
  const resultWithoutPassword = excludeFromList(result, ["password"]);
  return resultWithoutPassword;
};

const getByIdFromDB = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  let resultWithoutPassword = null;

  if (result) {
    resultWithoutPassword = excludeFromObject(result, ["password"]);
  }

  return resultWithoutPassword;
};

const updateIntoDB = async (id: string, payload: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: payload,
  });

  let resultWithoutPassword = null;

  if (result) {
    resultWithoutPassword = excludeFromObject(result, ["password"]);
  }

  return resultWithoutPassword;
};

const deleteFromDB = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  let resultWithoutPassword = null;

  if (result) {
    resultWithoutPassword = excludeFromObject(result, ["password"]);
  }

  return resultWithoutPassword;
};

export const UserService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
