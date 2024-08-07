import Equipment from "../(models)/Equipment";
import Salle from "../(models)/Salle";
import mongoose from "mongoose";
import Transfert from "../(models)/Transfert";

export async function transferEquipment(equipmentId:string,newSalleId:string) {
    try {
        // Find the equipment by its ID
        const equipment = await Equipment.findById(equipmentId).exec();
        if (!equipment) {
            console.log('Equipment not found');
            return;
        }

        // Store the old salle ID
        const oldSalleId = equipment.salle;

        // Find the new salle by its ID
        const newSalle = await Salle.findById(newSalleId).populate('service').exec();
        if (!newSalle) {
            console.log('New salle not found');
            return;
        }

   

        const transfer = new Transfert({
                equipmentName:equipment.name,
                reference:equipment.reference,
                oldservice:equipment.service,
                newservice:newSalle.service._id,
                oldsalle:oldSalleId,
                newsalle:newSalle.name,
                date:new Date().toString()

            })
        
            await transfer.save()
        // Update the salle and service references in the equipment document
    

        equipment.salle = newSalleId;
        equipment.service = newSalle.service._id;
        await equipment.save();




        // Remove the equipment reference from the old salle's equipment list
        if (oldSalleId) {
            await Salle.findByIdAndUpdate(oldSalleId, { $pull: { equipments: equipmentId } }).exec();
        }

        // Add the equipment reference to the new salle's equipment list
        await Salle.findByIdAndUpdate(newSalleId, { $push: { equipments: equipmentId } }).exec();

        console.log('Equipment transferred successfully');
    } catch (error) {
        console.error('Error transferring equipment:', error);
    }
}





// Example usage
// const equipmentId = 'equipment_id_here';
// const newSalleId = 'new_salle_id_here';
// transferEquipment(equipmentId, newSalleId).catch(console.error);
