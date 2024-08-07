import Salle from "@/app/(models)/Salle";
import Service from "@/app/(models)/Service";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";



export async function GET(req:Request,context:any){
  await connectToDatabase();
    
    const {params}=context
    const id=params.id
     
    try {
        const salles = await Salle.find({service:id}).lean().exec();
        const service = await Service.findById(id).lean().exec();
          
        return NextResponse.json({service,salles}, { status: 200 });
      } catch (error) {
        console.error('GET salles error:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
      }
}
