import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import recipeRoutes from './routes/recipe.routes';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', recipeRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, statusCode: status, data: data });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
