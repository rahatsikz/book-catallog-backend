import { Book, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import {
  bookRelationalFieldMapper,
  bookRelationalFields,
  bookSearchableFields,
} from "./book.constant";
import { IPaginationOptions } from "../../../interface/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelpers";

const insertIntoDB = async (bookData: any): Promise<Book> => {
  const result = await prisma.book.create({
    data: bookData,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
) => {
  const { search, ...filterData } = filters;

  const { page, size, skip } = paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (bookRelationalFields.includes(key)) {
          return {
            [bookRelationalFieldMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else if (["minPrice"].includes(key)) {
          return {
            price: {
              gte: parseFloat((filterData as any)[key]),
            },
          };
        } else if (["maxPrice"].includes(key)) {
          return {
            price: {
              lte: parseFloat((filterData as any)[key]),
            },
          };
        } else {
          return {};
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {},
    include: {
      category: true,
    },
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });

  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

export const BookService = {
  insertIntoDB,
  getAllFromDB,
};
