import mongoose from "mongoose";

const demandeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nameEquipment: { type: String, required: true },
    service: { type: String, required: true },
    salle:{ type: String, required: true },
    is_New:{ type: Boolean, default:true },
    message:{ type: String },
});


export default mongoose.models.Demande || mongoose.model('Demande', demandeSchema);

