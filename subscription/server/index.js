import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

const app = express();
connectDB();

app.use(cors());
app.use(json());

// routes (use ./ not ../)
import authRoutes from './routes/auth.js';
import plansRoutes from './routes/plans.js';
import subscriptionsRoutes from './routes/subscriptions.js';
app.use('/api/auth', authRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
