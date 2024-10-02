
import Salle from "@/app/(models)/Salle";
import Service from "@/app/(models)/Service";
import Transfert from "@/app/(models)/Transfert";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server"


if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
  }

export const dynamic = 'force-dynamic';
  
export async function GET() {
    await connectToDatabase();
    try {
         const transferts = await Transfert.find({}).sort({ date: -1 }).lean().exec();
         const services = await Service.find({}).lean().exec();
         const salles = await Salle.find({}).lean().exec();

         return NextResponse.json({transferts,services,salles},{status:200})

        }
    catch (error:any) {
        console.error('GET transferts  error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
}


 


