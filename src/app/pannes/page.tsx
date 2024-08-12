
'use client'
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Equipment } from "../components/AddEquipment";
import { Loading } from "../components/Equipments";
import { Service } from "../components/AddService";
import { Salle } from "../components/AddSalle";


export default function Page() {


    const [equipments,setEquipments]=useState<Equipment[]>([])
    const [services,setServices]=useState<Service[]>([])
    const [salles,setSalles]=useState<Salle[]>([])
    const router=useRouter()
    const [laoding,setLoading]=useState(true)

       useEffect(()=>{
           async function fetchdata() {
               const res=await fetch('/api/equipments')
               const data = await res.json()
               const panne=data.equipments.filter((item:Equipment)=>item.etat=='panne')
               setEquipments(panne)
               setServices(data.services)
               setSalles(data.salles)
                  console.log(data.services)
               setLoading(false)
            
           } 
   
           fetchdata()
   
   },[])
   

  return (
    <>
            <h1 className="text-center text-4xl my-5">Equipments en Panne</h1>
             <div className="grid gap-4 mb-5 md:mb-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center place-items-center">   { !laoding? 
              
                equipments?.map(item=>
                       <button  onClick={()=>router.push(`/equipments/${item._id}`)} key={item._id}  className={`cuve w-[350px] h-[350px] shadow-md transform transition duration-500 ease-in-out bg-red-300 cursor-pointer hover:scale-105 hover:bg-red-500 hover:text-white`}>
                       
                        <h1 className="text-center font-bold p-5 text-xl">Name : {item.name}</h1>
                        <h1 className="text-center font-bold p-5 text-xl">Service : {services.find((ser:Service)=>ser._id==item.service)?.name}</h1>
                        <h1 className="text-center font-bold p-5 text-xl">Salle : {salles.find((salle:Salle)=>salle._id==item.salle)?.name}</h1>
                      
                      </button>
                )   
                

              
              : Loading()
            }
        </div>
    
    </>
  );
}
