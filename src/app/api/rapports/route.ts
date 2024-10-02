import Maintenance from "@/app/(models)/Maintenance";
import Rapport from "@/app/(models)/Rapport";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'; export const revalidate = 0;

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
  }


// export async function GET() {
//     await connectToDatabase();
//     try {
//          const rapports = await Rapport.find({}).lean().exec();


//          return NextResponse.json(rapports,{status:200})

//         }
//     catch (error:any) {
//         console.error('GET equipments  error:', error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//       }
// }
  
export async function POST(req:NextRequest) {
    await connectToDatabase();

    try {
        const body= await req.json()
        const {name,equipmentID,url,date,maintenance,salle}=body

        const rapport=new Rapport({name,equipmentID,url,date,maintenance,salle})
        const newrapport =await rapport.save()
          

         return NextResponse.json(newrapport,{status:200})

        }
    catch (error:any) {
        console.error('add new rapport  error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }


}



