
'use client'
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Equipment } from "../components/AddEquipment";
import { Loading } from "../components/Equipments";
import { Service } from "../components/AddService";
import { Salle } from "../components/AddSalle";












const AddtoMaintenance = async (equipment:Equipment) => {
  const response = await fetch('/api/Maintenance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(equipment),
  });

  if (!response.ok) {
    throw new Error('Failed to add equipment');
  }

  const newequipment = await response.json();
  return newequipment;
};



export default function Page() {


    const [equipments,setEquipments]=useState<Equipment[]>([])
    const [services,setServices]=useState<Service[]>([])
    const [salles,setSalles]=useState<Salle[]>([])
    const router=useRouter()
const [refersh,setRefresh]=useState(false)
 
    const [laoding,setLoading]=useState(true)

     useEffect(()=>{
           async function fetchdata() {
               const res=await fetch('/api/equipments',{ cache: 'no-store',})
               const data = await res.json()
               const panne=data.equipments.filter((item:Equipment)=>item.etat=='panne')
               setEquipments(panne)
               setServices(data.services)
               setSalles(data.salles)
                  console.log(data.services)
               setLoading(false)
            
           } 
   
           fetchdata()
   
   },[refersh])







   const sendToMaintanence= async (equipment:Equipment)=>{

        console.log(equipment)
        try {
          const newEquipment = await AddtoMaintenance(equipment);
          console.log('New equipment:', newEquipment);
          alert("Equipment added To Maintenance")

          setRefresh(!refersh)
         
        } catch (error:any) {
          console.log(error.message);
          alert("ERR try again")
        }
    
   }
   

  return (
    <>
            <h1 className="text-center text-4xl my-5">Equipments en Panne</h1>
             <div className="flex flex-wrap justify-around">   { !laoding? 
              
                equipments?.map((item:Equipment)=>
                      <div className="shadow my-10 mx-5 p-5 hover:!z-10">
                          <div  onClick={()=>router.push(`/equipments/${item._id}`)} key={item._id}  className={`w-[350px]  flex flex-col justify-between items-center h-[350px] py-5 shadow-md transform transition duration-500 ease-in-out bg-red-300 cursor-pointer hover:scale-105 hover:bg-red-500 hover:text-white `}>
                          
                              <h1 className="text-center font-bold p-5 text-xl">Name : {item.name}</h1>
                              <h1 className="text-center font-bold p-5 text-xl">Service : {services.find((ser:Service)=>ser._id==item.service)?.name}</h1>
                              <h1 className="text-center font-bold p-5 text-xl">Salle : {salles.find((salle:Salle)=>salle._id==item.salle)?.name}</h1>                         
                          </div>
                          <button type="button" onClick={()=>sendToMaintanence(item)}  className="my-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Send To Maintenance</button>
                      </div>
                  
                )   
                

              
              : Loading()
            }
        </div>
    
    </>
  );
}
