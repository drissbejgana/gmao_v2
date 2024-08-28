import mongoose from "mongoose";

const rapportSchema = new mongoose.Schema({
    name: { type: String },
    equipmentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' },
    url: { type: String, required: true },
    date: { type: String, required: true },
    maintenance: {
        type: String,
        enum: ['preventive', 'curative'],
        default: 'preventive',
      },
    salle: { type: mongoose.Schema.Types.ObjectId, ref: 'Salle', required: true },

}) ;


export default mongoose.models.Rapport || mongoose.model('Rapport', rapportSchema);
