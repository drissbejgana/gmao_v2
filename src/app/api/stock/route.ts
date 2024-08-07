import Stock from "@/app/(models)/Stock";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server"


if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  
export async function GET() {
    await connectToDatabase();
    try {
         const equipments = await Stock.find({}).lean().exec();


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
        const {name,marque,quantite,etat,reference,referenceInterne,contactFournisseur}=body
        console.log(etat)


          const equipment=new Stock({name,marque,quantite,etat,reference,referenceInterne,contactFournisseur})
          const newequipment =await equipment.save()

    

         return NextResponse.json(newequipment,{status:200})

        }
    catch (error:any) {
        console.error('add new equipment  error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }


}



