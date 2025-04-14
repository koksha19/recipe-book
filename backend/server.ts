import express from 'express';
import dotenv from 'dotenv';

import recipeRoutes from './routes/recipe.routes';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', recipeRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
