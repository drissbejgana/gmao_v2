import User from "@/app/(models)/User"
import { connectToDatabase } from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"


export const dynamic = 'force-dynamic';


export async function DELETE(request:Request,context:any) {
    const {params}=context
    const id=params.id
    await connectToDatabase()
    try {
      const user = await User.findOneAndDelete(id);
      
      return NextResponse.json({ status: 200 });
    } catch (error) {
      console.error('GET error:', error);
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  
  }