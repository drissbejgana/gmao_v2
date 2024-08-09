import Transfert from "@/app/(models)/Transfert"
import { connectToDatabase } from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function DELETE(request:Request,context:any) {
    const {params}=context
    const id=params.id
    await connectToDatabase()
    try {
      const tra = await Transfert.findOneAndDelete(id);
      
      return NextResponse.json({ status: 200 });
    } catch (error) {
      console.error('GET error:', error);
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  
  }