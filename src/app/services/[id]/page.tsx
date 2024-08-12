
import { options } from "@/app/api/auth/[...nextauth]/options";
import Sallee from "@/app/components/Sallee";
import Salles from "@/app/components/Salles";
import { getServerSession } from "next-auth";


type Props={
    params:{id:string}
}


export default async function Page({params}:Props) {
   
//   const session=await getServerSession(options)

        
  return (
    <Salles  service={params.id}  />
  );
  
}
