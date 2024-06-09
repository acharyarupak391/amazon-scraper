import express, { Request, Response } from 'express';
import Product from './models/Product';
import cors from 'cors';

const app = express();

import dotenv from 'dotenv'
import { validateWithSchema } from './schema';
import { corsOptions } from './cors';
dotenv.config()

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors(corsOptions));

// Route to fetch all products
app.get('/products', async (_req: Request, res: Response) => {
  try {
    const products = await Product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Route to add a new product
app.post('/product', async (req: Request, res: Response) => {
  const error = validateWithSchema(req);

  if (error) {
    return res.status(400).json({ error });
  }

  try {
    await Product.create({
      data: req.body
    })
    res.json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});