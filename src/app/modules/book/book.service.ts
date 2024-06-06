import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (bookData: any): Promise<Book> => {
  const result = await prisma.book.create({
    data: bookData,
    include: {
      category: true,
    },
  });
  return result;
};

export const BookService = {
  insertIntoDB,
};
