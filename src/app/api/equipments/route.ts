import Equipment from "@/app/(models)/Equipment"
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
         const equipments = await Equipment.find({}).lean().exec();
         const services = await Service.find({}).lean().exec();
         const salles = await Salle.find({}).lean().exec();

         return NextResponse.json({equipments,services,salles},{status:200})

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
        const {name,marque,service,quantite,etat,reference,referenceInterne,contactFournisseur,salle}=body
        console.log(etat)


          const equipment=new Equipment({name,service,marque,quantite,etat,reference,referenceInterne,contactFournisseur ,salle})
          const newequipment =await equipment.save()

          const Fsalle:any= await Salle.findById(salle)

           Fsalle.equipments.push(Fsalle)
          await Fsalle.save()


         return NextResponse.json(newequipment,{status:200})

        }
    catch (error:any) {
        console.error('add new equipment  error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }


}



