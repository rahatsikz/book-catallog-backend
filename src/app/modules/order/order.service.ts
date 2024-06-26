import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { IOrder } from "./order.interface";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Order, Role } from "@prisma/client";

const insertIntoDB = async (userData: JwtPayload | null, orderData: IOrder) => {
  const { status, orderedBooks } = orderData;

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userData?.userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await prisma.$transaction(async (tx) => {
    const createOrder = await tx.order.create({
      data: {
        userId: userData?.userId,
        status: status,
      },
    });

    if (orderData?.orderedBooks.length > 0) {
      for (let i = 0; i < orderedBooks.length; i++) {
        // const element = orderedBooks[i];
        const { bookId, quantity } = orderedBooks[i];
        await tx.orderedBook.create({
          data: {
            orderId: createOrder.id,
            bookId,
            quantity,
          },
        });
      }
    }

    const orderIncludingBooks = await tx.order.findUnique({
      where: {
        id: createOrder.id,
      },
      include: {
        orderedBooks: true,
      },
    });

    return orderIncludingBooks;
  });

  return result;
};

const getAllFromDB = async (userData: JwtPayload | null): Promise<Order[]> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userData?.userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await prisma.order.findMany({
    include: {
      orderedBooks: true,
    },
    where: {
      userId: isUserExist.role === Role.customer ? isUserExist.id : {},
    },
  });
  return result;
};

const getByIdFromDB = async (orderId: string, userData: JwtPayload | null) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userData?.userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await prisma.order.findUnique({
    where: {
      id: orderId,
      userId: isUserExist.role === Role.customer ? isUserExist.id : {},
    },
    include: {
      orderedBooks: true,
    },
  });

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Either Order not found or you are not authorized to see it"
    );
  }

  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
};
