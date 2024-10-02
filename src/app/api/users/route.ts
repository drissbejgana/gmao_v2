import { NextRequest, NextResponse } from "next/server";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/app/utils/dbConnect";
import Service from "@/app/(models)/Service";


export const dynamic = 'force-dynamic'; export const revalidate = 0;

export async function GET() {

    await connectToDatabase();
    try {
          const users= await User.find({}).lean().exec()
          const services= await Service.find({}).lean().exec()
          
      return NextResponse.json({users,services}, { status: 200 });
  
    } catch (error:any) {
      console.error('GET Users error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
}

export async function POST(req:NextRequest){
   await connectToDatabase();

        try
        {
           const body= await req.json()
           const {name,service,role,email,password}=body
           console.log(name,service,role,email,password)
  

           const duplicate = await User.findOne({ email:email })
           .lean()
           .exec();
     
         if (duplicate) {
           return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
         }
     
         const hashPassword = await bcrypt.hash(password, 10);
         let user=new User({})

         if(role=="Admin"){
             user=new User({
                name,
                role,
                email,
                password:hashPassword,
               })
         }
         else{
             user=new User({
                name,
                role,
                email,
                password:hashPassword,
                service
               })
    
         }
    


           const newuser= await user.save()

          return NextResponse.json(newuser,{status:200})

        }
        catch(error:any){
          console.error('Add user error:', error);
          return NextResponse.json({ error: error.message }, { status: 500 });
        }


}

