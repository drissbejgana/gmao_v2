import mongoose from "mongoose";

const rapportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    equipmentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' },
    url: { type: String, required: true },
    date: { type: String, required: true },
    maintenance: {
        type: String,
        enum: ['preventive', 'curative'],
        default: 'preventive',
      },

}) ;


export default mongoose.models.Rapport || mongoose.model('Rapport', rapportSchema);
