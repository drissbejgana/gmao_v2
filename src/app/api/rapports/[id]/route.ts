
import Rapport from "@/app/(models)/Rapport";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, context: any) {

    await connectToDatabase();

    const { params } = context;
    const id = params.id;

    try {


        const rapports = await Rapport.find({equipmentID:id});
        const rapport = await Rapport.findById(id);

        return NextResponse.json({rapport,rapports}, { status: 200 });

    } catch (error) {
        console.error('GET error:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}



export async function PATCH(request: NextRequest, context: any) {

    await connectToDatabase();
    const { params } = context;
    const id = params.id;

    try {
        const body = await request.json();
        const {name,url,date,maintenance,salle}=body

        const updatedRapport = await Rapport.findByIdAndUpdate(id, {name,url,date,maintenance,salle}, { new: true });

        if (!updatedRapport) {
            return NextResponse.json({ error: 'Rapport not found' }, { status: 404 });
        }
        

        return NextResponse.json(updatedRapport, { status: 200 });

    } catch (error) {
        console.error('UPDATE error:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest,context: any) {

    await connectToDatabase();

    const { params } = context;
    const id = params.id;

    try {

          await Rapport.findByIdAndDelete(id);

        return NextResponse.json({msg:'deleted'}, { status: 200 });

    } catch (error) {
        console.error('GET error:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
