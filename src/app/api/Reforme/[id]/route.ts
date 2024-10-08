import Equipment from "@/app/(models)/Equipment";
import Reforme from "@/app/(models)/Reforme";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export const dynamic = 'force-dynamic'; export const revalidate = 0;


export async function DELETE(request: NextRequest, context: any) {
    await connectToDatabase();
  
    const { params } = context;
    const id = params.id;
  
    try {
      const equipment= await Reforme.findById(id)
      
      const newequipment=new Equipment({
        name:equipment.name,
        marque:equipment.marque,
        reference:equipment.reference,
        quantite:1,
        referenceInterne:equipment.referenceInterne,
        contactFournisseur:equipment.contactFournisseur,
        salle:equipment.salle,
        service:equipment.service
        
    })
     await newequipment.save()

     await Reforme.findByIdAndDelete(id)
    
  
      return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error:any) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
