import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (categoryData: any): Promise<Category> => {
  const result = await prisma.category.create({
    data: categoryData,
  });
  return result;
};

const getAllFromDB = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({});
  return result;
};

const getByIdFromDB = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id: id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

const updateIntoDB = async (id: string, payload: Partial<Category>) => {
  const result = await prisma.category.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const CategoryService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
