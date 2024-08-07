'use client'
import { Loading } from "@/app/components/Equipments";
import UpdateEquipment from "@/app/components/UpdateEquipment";
import { Demande } from "@/app/demande/page";
import { useEffect, useState } from "react";


type Props = {
    params: { id: string };
  };
  

export default function Page({params}:Props) {


    const [demande,setDemande]=useState<Demande>({_id:'',name:'',nameEquipment:'',service:'',is_New:true,salle:'',message:''})

   const [laoding,setloading]=useState(true)

useEffect(()=>{
    async function fetchdata() {
        const res=await fetch(`/api/demande/${params.id}`)
        const data = await res.json()
        console.log(data)
        setDemande(data)
        setloading(false)
    } 
    
    fetchdata()
    
},[params.id])


  return (
        <>
             <h1 className="text-center text-4xl my-5 ">Demande</h1>
              <div className="grid gap-4 mb-5 md:mb-0 grid-cols-1 md:grid-cols-3 place-content-center place-items-center"> 
                  { !laoding? 
      
                       <button  className={`py-5 px-12 shadow-md transform transition duration-500 ease-in-out ${!demande.is_New?'bg-red-300':'bg-green-300'} cursor-pointer hover:scale-105 `}>
                        <h1 className="text-center font-bold p-5 text-xl"> <span>Name</span> : {demande.name}</h1>
                        <h1 className="text-center font-bold p-5 text-xl"> <span>Equipment Name</span> : {demande.nameEquipment}</h1>
                        <h1 className="text-center font-bold p-5 text-xl"> <span>Service</span> : {demande.service}</h1>
                        <h1 className="text-center font-bold p-5 text-xl"> <span>Salle</span> : {demande.salle}</h1>
                        <h1 className="text-center font-bold p-5 text-xl"> <span>Message</span> : {demande.message}</h1>
                      </button>
                
            
              
              : Loading()
            }
            </div>
        </>
  );
}
