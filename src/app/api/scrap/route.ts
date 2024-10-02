import Reforme from "@/app/(models)/Reforme";
import Scrap from "@/app/(models)/Scrap";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'; export const revalidate = 0;

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  
export async function GET() {
    await connectToDatabase();
    try {
         const equipments = await Scrap.find({}).lean().exec();


         return NextResponse.json(equipments,{status:200})

        }
    catch (error:any) {
        console.error('GET equipments  error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
}


  
export async function POST(req:NextRequest) {
    await connectToDatabase();


    try {
        const body= await req.json()
        const {_id,name,marque,reference,referenceInterne,contactFournisseur,salle,service}=body
          
        const equipment=new Scrap({name,marque,reference,salle,service,referenceInterne,contactFournisseur})
        const newequipment =await equipment.save()
          
          await Reforme.findByIdAndDelete(_id)
              
        
         return NextResponse.json(newequipment,{status:200})

        }
    catch (error:any) {
        console.error('add new equipment  error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }


}



