# Book catallog (backend)

This repository is the backend of a Book Listing Application. Prisma, Postgres and Express has been used.

## Live Link

[https://book-catallog-backend-three.vercel.app](https://book-catallog-backend-three.vercel.app)

## Application Routes:

#### User

- Sign up : https://book-catallog-backend-three.vercel.app/api/v1/auth/signup
- Sign in : https://book-catallog-backend-three.vercel.app/api/v1/auth/signin
- Get all users: https://book-catallog-backend-three.vercel.app/api/v1/users
- Get single user: https://book-catallog-backend-three.vercel.app/api/v1/users/e94ca440-d92b-4308-8f25-531b6e0aecff
- Update user: https://book-catallog-backend-three.vercel.app/api/v1/users/e94ca440-d92b-4308-8f25-531b6e0aecff
- Delete user: https://book-catallog-backend-three.vercel.app/api/v1/users/34132c1e-dee2-47a3-87b9-acdeee93748c
- Get Profile: https://book-catallog-backend-three.vercel.app/api/v1/profile

#### Category

- Create Category: https://book-catallog-backend-three.vercel.app/api/v1/categories/create-category
- Get all Categories: https://book-catallog-backend-three.vercel.app/api/v1/categories
- Get single Category: https://book-catallog-backend-three.vercel.app/api/v1/categories/9332ac42-1722-4386-ba17-50df083f2aec
- Update Category: https://book-catallog-backend-three.vercel.app/api/v1/categories/ff581f86-0aa9-459c-aa28-2d06bc05e9c8
- Delete Category: https://book-catallog-backend-three.vercel.app/api/v1/categories/7010b480-1b84-4757-a161-c9798bf64dab

#### Books

- Create Book: https://book-catallog-backend-three.vercel.app/api/v1/books/create-book
- Book Filtering with meta data : https://book-catallog-backend-three.vercel.app/api/v1/books?sortBy=price&sortOrder=asc
- Get books by categoryId: https://book-catallog-backend-three.vercel.app/api/v1/books/9332ac42-1722-4386-ba17-50df083f2aec/category
- Get Single book: https://book-catallog-backend-three.vercel.app/api/v1/books/43bc7efa-cb4b-4955-9f6a-873283577683
- Update book: https://book-catallog-backend-three.vercel.app/api/v1/books/43bc7efa-cb4b-4955-9f6a-873283577683
- Delete book: https://book-catallog-backend-three.vercel.app/api/v1/books/2f19c720-c46e-4d07-ac77-9eb736f42586

#### Orders

- Create order: https://book-catallog-backend-three.vercel.app/api/v1/orders/create-order
- Get all orders(Admin/Specific Customer): https://book-catallog-backend-three.vercel.app/api/v1/orders
- Get single order: https://book-catallog-backend-three.vercel.app/api/v1/orders/d464e529-699d-46d1-b398-17cc34b15512
