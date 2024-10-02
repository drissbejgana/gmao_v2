
import Salle from "@/app/(models)/Salle";
import Service from "@/app/(models)/Service";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic';

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  
export async function GET() {
    await connectToDatabase();
    try {
         const Salles = await Salle.find({}).lean().exec();
         return NextResponse.json(Salles,{status:200})

        }
    catch (error:any) {
        console.error('GET Salles  error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
}


  
export async function POST(req:NextRequest) {
    await connectToDatabase();

    try {
          const body= await req.json()
  
          const {name,service}=body
               
          const Fservice:any= await Service.findById(service).exec()

          const salle=new Salle({name,service:Fservice._id})

          const neweSalle =await salle.save()
          
          Fservice.salles.push(neweSalle);
          await Fservice.save();


         return NextResponse.json(neweSalle,{status:200})

        }
    catch (error:any) {
        console.error('add new Salle  error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }


}



