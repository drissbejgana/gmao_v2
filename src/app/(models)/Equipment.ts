import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    marque: { type: String, required: true },
    quantite: { type: Number, required: true },
    etat: {
        type: String,
        enum: ['bon', 'panne'],
        default: 'bon',
      },
    reference: { type: String},
    referenceInterne: { type: String, required: true },
    contactFournisseur: { type: String},
    salle: { type: mongoose.Schema.Types.ObjectId, ref: 'Salle', required: true }
});


export default mongoose.models.Equipment || mongoose.model('Equipment', equipmentSchema);

