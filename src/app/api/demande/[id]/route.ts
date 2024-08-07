import Demande from "@/app/(models)/Demande";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";




export async function GET(request: NextRequest, context: any) {

    await connectToDatabase();

    const { params } = context;
    const id = params.id;

    try {


        const demande = await Demande.findById(id);
     
        if (!demande) {
            return NextResponse.json({ error: 'Demande not found' }, { status: 404 });
        }

        const updated =await Demande.findByIdAndUpdate(demande._id,{is_New:false},{ new: true })
        
        
        return NextResponse.json(demande, { status: 200 });

    } catch (error) {
        console.error('GET error:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}




