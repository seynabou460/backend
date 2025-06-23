import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  prix: { type: Number, required: true },
  devise: { type: String, required: true },
  image: { type: String, required: true } // maintenant obligatoire
});

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;