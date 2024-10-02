
import Equipment from "@/app/(models)/Equipment";
import Stock from "@/app/(models)/Stock";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest, context: any) {
    await connectToDatabase();

    const { params } = context;
    const id = params.id;
    
   try {

    const body= await request.json()
    const {salle,service,quantite}=body
     

     const stock= await Stock.findById(id)
          console.log(stock)
          if(stock.quantite < quantite || stock.quantite<=0)
           {return NextResponse.json({message:"quantite stock Error"},{status:404})} 

         else 
            {
      
                const newequipment=new Equipment({
                    name:stock.name,
                    marque:stock.marque,
                    etat:stock.etat,
                    reference:stock.reference,
                    quantite:quantite,
                    referenceInterne:stock.referenceInterne,
                    contactFournisseur:stock.contactFournisseur,
                    salle,
                    service
                    
                })
                 await newequipment.save()
                    stock.quantite=stock.quantite-quantite
                 await stock.save()
                
            }

     return NextResponse.json({message:"su"},{status:200})
   } catch (error) {

     return NextResponse.json(error,{status:500})

   }
        
}



// export async function PATCH(request: NextRequest, context: any) {

//     await connectToDatabase();
//     const { params } = context;
//     const id = params.id;

//     try {
//         const body = await request.json();
//         const {name,marque,quantite,etat,reference,referenceInterne,contactFournisseur}=body

//         const updatedEquipment = await Stock.findByIdAndUpdate(id, {name,marque,quantite,etat,reference,referenceInterne,contactFournisseur}, { new: true });

//         if (!updatedEquipment) {
//             return NextResponse.json({ error: 'Equipment not found' }, { status: 404 });
//         }
        

//         return NextResponse.json(updatedEquipment, { status: 200 });

//     } catch (error) {
//         console.error('UPDATE error:', error);
//         return NextResponse.json({ error: (error as Error).message }, { status: 500 });
//     }
// }











export async function DELETE(request: NextRequest, context: any) {
    await connectToDatabase();
  
    const { params } = context;
    const id = params.id;
  
    try {
   
      await Stock.findByIdAndDelete(id);
  
      return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error:any) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
