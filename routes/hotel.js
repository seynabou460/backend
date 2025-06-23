import express from 'express';
import {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel
} from '../controllers/hotelController.js';

import { verifyToken } from '../middleware/auth.js';

// Si tu utilises Cloudinary + Multer
import upload from '../config/multer-cloudinary.js';

const router = express.Router();

// 🔐 Toutes les routes sont protégées par le middleware d'authentification
router.get('/', verifyToken, getHotels);             // Obtenir la liste des hôtels
router.get('/:id', verifyToken, getHotelById);       // Obtenir un hôtel par son ID

// Ajout d’un hôtel avec image uploadée (ex: depuis un formulaire Angular)
router.post('/', verifyToken, upload.single('image'), createHotel);

// Mise à jour d’un hôtel (avec ou sans nouvelle image)
router.put('/:id', verifyToken, upload.single('image'), updateHotel);

// Suppression d’un hôtel
router.delete('/:id', verifyToken, deleteHotel);

export default router;