import mongoose from "mongoose";


const TransfertSchema = new mongoose.Schema({
    equipmentName: { type: String, required: true },
    reference: { type: String, required: true },
    oldservice: { type: String, required: true },
    newservice: { type: String, required: true },
    oldsalle: { type: String, required: true },
    newsalle: { type: String, required: true },
    date:{type:String,required:true},
    
});


export default mongoose.models.Transfert || mongoose.model('Transfert', TransfertSchema);
