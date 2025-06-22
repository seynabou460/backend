import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import hotelRoutes from './routes/hotel.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
console.log('🧪 URI utilisée :', process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    app.listen(5000, () => {
      console.log('🚀 Serveur lancé sur le port 5000');
    });
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion MongoDB :', err);
  });