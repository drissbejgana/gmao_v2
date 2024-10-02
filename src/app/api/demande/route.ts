import Demande from "@/app/(models)/Demande";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'; export const revalidate = 0;

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
  }


  
export async function GET() {
    await connectToDatabase();
    try {
         const demandes = await Demande.find({}).lean().exec();
        
         return NextResponse.json(demandes,{status:200})

        }
    catch (error:any) {
        console.error('GET Demandes  error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
}

  
export async function POST(req:NextRequest) {
    await connectToDatabase();


    try {
          const body= await req.json()
          const {name,nameEquipment,service,salle,message}=body

          const demande=new Demande({name,nameEquipment,service,salle,message})
          const newdemande =await demande.save()


         return NextResponse.json(newdemande,{status:200})

        }
    catch (error:any) {
        console.error('add new demande  error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }


}




