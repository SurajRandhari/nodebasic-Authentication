import express from 'express';
import mongoose from 'mongoose';
import connectDB from './db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('helooow')
})

app.use('/api/users', userRoutes);

app.listen(PORT, () =>{
    console.log(`sercer is running on http://localhost:${PORT}`);
    
})