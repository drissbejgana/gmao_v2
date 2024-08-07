import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    name: { type: String, required: true },
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
});


export default mongoose.models.Stock || mongoose.model('Stock', StockSchema);
