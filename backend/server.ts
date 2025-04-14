import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import { connectDb } from './utils/connectDb';

const app = express();

const PORT = process.env.PORT || 3000;

connectDb();

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
