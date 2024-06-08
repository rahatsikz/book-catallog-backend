import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { IOrder } from "./order.interface";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

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

export const OrderService = {
  insertIntoDB,
};
