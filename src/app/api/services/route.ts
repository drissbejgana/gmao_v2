
import Salle from "@/app/(models)/Salle";
import Service from "@/app/(models)/Service";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server"


if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  
export async function GET() {
    await connectToDatabase();
    try {
         const services = await Service.find({}).lean().exec();
         const salles = await Salle.find({}).lean().exec();
         return NextResponse.json({services,salles},{status:200})

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

      const {name,location}=body
    
         const service=new Service({name,location})
          const neweService =await service.save()

         return NextResponse.json(neweService,{status:200})

        }
    catch (error:any) {
        console.error('add new service  error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }


}



