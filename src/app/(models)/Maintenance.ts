import mongoose from 'mongoose';

const MaintenanceSchema = new mongoose.Schema({

    name: { type: String, required: true },
    marque: { type: String, required: true },
    reference: { type: String},
    referenceInterne: { type: String, required: true },
    contactFournisseur: { type: String},
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    salle: { type: mongoose.Schema.Types.ObjectId, ref: 'Salle', required: true },
 
}, {
  timestamps: true,
});

export default mongoose.models.Maintenance || mongoose.model('Maintenance', MaintenanceSchema);
