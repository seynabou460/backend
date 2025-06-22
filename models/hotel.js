import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  etoiles: { type: Number, default: 3 },
  image: { type: String } // facultatif, pour afficher une photo dans Angular
});

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;