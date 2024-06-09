import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Product = prisma.product;

export default Product;