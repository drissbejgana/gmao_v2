import mongoose from "mongoose";


const ServiceSchema=new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    location:{
      type: String,
      enum: ['premieretage', 'Deuxiemeetage', 'Rez-de-chaussee','moins-un', 'moins-deux','moins-trois'],
      required: true,
    },
    salles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Salle' }]
  },{
    timestamps: true,
  })


export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);

