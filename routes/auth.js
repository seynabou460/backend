import express from 'express';
import { register, login } from '../controllers/authController.js';
import Hotel from '../models/hotel.js'; // en respectant le nom du fichier

const router = express.Router();

router.post('/register', register);
router.post('/login', (req, res) => {
  // connexion logique ici
  res.status(200).json({ token: 'FAKE_TOKEN' }); // test temporaire
});
export default router;