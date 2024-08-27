import Maintenance from "@/app/(models)/Maintenance";
import Rapport from "@/app/(models)/Rapport";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server"


if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  


  
export async function POST(req:NextRequest) {
    await connectToDatabase();

    try {
        const body= await req.json()
        const {name,equipmentID,url,date,maintenance}=body

        const rapport=new Rapport({name,equipmentID,url,date,maintenance})
        const newrapport =await rapport.save()
          

         return NextResponse.json(newrapport,{status:200})

        }
    catch (error:any) {
        console.error('add new rapport  error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }


}



