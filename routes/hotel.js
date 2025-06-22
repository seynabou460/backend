import express from 'express';
import { getHotels, createHotel, deleteHotel } from '../controllers/hotelController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, getHotels);
router.post('/', verifyToken, createHotel);
router.delete('/:id', verifyToken, deleteHotel);

export default router;