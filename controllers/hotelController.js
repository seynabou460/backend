import Hotel from '../models/hotel.js';

// GET /api/hotels
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// POST /api/hotels
export const createHotel = async (req, res) => {
  try {
    const nouveauHotel = new Hotel(req.body);
    const hotelSauvegarde = await nouveauHotel.save();
    res.status(201).json(hotelSauvegarde);
  } catch (err) {
    res.status(400).json({ message: 'Données invalides' });
  }
};

// DELETE /api/hotels/:id
export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ message: 'Hôtel non trouvé' });
  }
};