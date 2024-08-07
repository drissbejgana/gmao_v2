import Equipment from "@/app/(models)/Equipment";
import Stock from "@/app/(models)/Stock";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { transferEquipment } from "@/app/utils/functions";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, context: any) {

    await connectToDatabase();

    const { params } = context;
    const id = params.id;
    const body= await request.json()
    const {salleId}=body
     
   try {

     transferEquipment(id,salleId).catch(console.error)
     
     return NextResponse.json({message:"su"},{status:200})
   } catch (error) {
     return NextResponse.json({message:"Error"},{status:500})

   }
        
}



export async function GET(request: NextRequest, context: any) {

    await connectToDatabase();

    const { params } = context;
    const id = params.id;

    try {


        const equipment = await Equipment.findById(id);

        if (!equipment) {
            return NextResponse.json({ error: 'Equipment not found' }, { status: 404 });
        }
        

        return NextResponse.json(equipment, { status: 200 });

    } catch (error) {
        console.error('GET error:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}


export async function PATCH(request: NextRequest, context: any) {

    await connectToDatabase();
    const { params } = context;
    const id = params.id;

    try {
        const body = await request.json();
        const {name,marque,quantite,etat,reference,referenceInterne,contactFournisseur}=body

        const updatedEquipment = await Equipment.findByIdAndUpdate(id, {name,marque,quantite,etat,reference,referenceInterne,contactFournisseur}, { new: true });

        if (!updatedEquipment) {
            return NextResponse.json({ error: 'Equipment not found' }, { status: 404 });
        }
        

        return NextResponse.json(updatedEquipment, { status: 200 });

    } catch (error) {
        console.error('UPDATE error:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}



export async function DELETE(request: NextRequest, context: any) {
    await connectToDatabase();
  
    const { params } = context;
    const id = params.id;
  
    try {
      const equipment = await Equipment.findById(id);
      if (!equipment) {
        return NextResponse.json({ message: "Equipment not found" }, { status: 404 });
      }
  
      const stock = await Stock.find({});
      let found = false;
  
      for (const item of stock) {
        if (item.reference === equipment.reference) {
          item.quantite += equipment.quantite;
          found = true;
          await item.save();
          break;
        }
      }
  
      if (!found) {
        const newStock = new Stock({
          name: equipment.name,
          marque: equipment.marque,
          quantite: 1,
          etat: equipment.etat,
          reference: equipment.reference,
          referenceInterne: equipment.referenceInterne,
          contactFournisseur: equipment.contactFournisseur,
        });
        await newStock.save();
      }
  
      await Equipment.findByIdAndDelete(id);
  
      return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error:any) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
