import Equipment from "@/app/(models)/Equipment";
import Rapport from "@/app/(models)/Rapport";
import Salle from "@/app/(models)/Salle";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; export const revalidate = 0;


export async function GET(req:Request,context:any){
  await connectToDatabase();
    
    const {params}=context
    const id=params.id
     
    try {
        const salle = await Salle.findById(id).lean().exec();
        const equipments = await Equipment.find({salle:id}).lean().exec();
        const rapports= await Rapport.find({salle:id}).lean().exec()

        return NextResponse.json({salle,equipments,rapports}, { status: 200 });
        
      } catch (error) {
        console.error('GET salles error:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
      }
}


export async function DELETE(request: NextRequest, context: any) {
  await connectToDatabase();

  const { params } = context;
  const id = params.id;

  try {
    const salle = await Salle.findById(id);
    if (!salle) {
      return NextResponse.json({ message: "Salle not found" }, { status: 404 });
    }


    await Salle.findByIdAndDelete(id);
  
    await Equipment.deleteMany({ salle: id });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
