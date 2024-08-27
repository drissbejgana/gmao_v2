
import Rapport from "@/app/(models)/Rapport";
import { connectToDatabase } from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, context: any) {

    await connectToDatabase();

    const { params } = context;
    const id = params.id;

    try {


        const rapports = await Rapport.find({equipmentID:id});

        return NextResponse.json(rapports, { status: 200 });

    } catch (error) {
        console.error('GET error:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
