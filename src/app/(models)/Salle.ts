import mongoose from "mongoose";


const salleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    equipments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }]
});


export default mongoose.models.Salle || mongoose.model('Salle', salleSchema);
