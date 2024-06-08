import { Status } from "@prisma/client";

export type IOrderedBooks = {
  bookId: string;
  quantity: number;
};

export type IOrder = {
  orderedBooks: IOrderedBooks[];
  status?: Status;
};
