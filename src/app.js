import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectToDb from './config/db.js';
import { authRouter } from './routes/authRoute.js';
import { todoRouter } from './routes/todoRoute.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config(); 
}
connectToDb();

const app = express();

app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    origin: process.env.NODE_ENV === 'production'
        ? 'https://todo-apps-ten-eta.vercel.app'
        : 'http://localhost:5000'
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'BFINIT Node.js Assessment API running' });
});

app.use('/api/auth', authRouter);
app.use('/api', todoRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


export default app;