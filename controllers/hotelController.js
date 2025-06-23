import Hotel from '../models/hotel.js';
import cloudinary from '../config/cloudinary.js';

// GET /api/hotels
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des hôtels.' });
  }
};

// POST /api/hotels
export const createHotel = async (req, res) => {
  try {
    const { nom, adresse, email, telephone, prix, devise } = req.body;

    if (!nom || !adresse || !email || !telephone || !prix || !devise || !req.file) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires, y compris l’image.' });
    }

    const nouveauHotel = new Hotel({
      nom,
      adresse,
      email,
      telephone,
      prix,
      devise,
      image: req.file.path // ✅ l’URL de l’image uploadée via Cloudinary
    });

    const hotelSauvegarde = await nouveauHotel.save();
    res.status(201).json(hotelSauvegarde);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l’enregistrement de l’hôtel.' });
  }
};

// GET /api/hotels/:id
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hôtel non trouvé.' });
    res.json(hotel);
  } catch (err) {
    res.status(400).json({ message: 'ID invalide.' });
  }
};

// PUT /api/hotels/:id
export const updateHotel = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      updates.image = req.file.path; // ✅ si nouvelle image fournie
    }

    const hotelModifie = await Hotel.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!hotelModifie) {
      return res.status(404).json({ message: 'Hôtel non trouvé pour mise à jour.' });
    }

    res.json(hotelModifie);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour.' });
  }
};

// DELETE /api/hotels/:id
export const deleteHotel = async (req, res) => {
  try {
    const deleted = await Hotel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Hôtel introuvable pour suppression.' });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la suppression.' });
  }
};