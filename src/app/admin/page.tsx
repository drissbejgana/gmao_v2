
'use client'

import { useRouter } from "next/navigation"
import { Salle } from "../components/AddSalle"
import { Service } from "../components/AddService"
import { useEffect, useState } from "react"
import { Loading } from "../components/Equipments"

  export default function Page() {

    
  const [services,setServices]=useState<Service[]>([])
  const [salles,setSalles]=useState<Salle[]>([])
  const router=useRouter()
  const [laoding,setLoading]=useState(true)

 
useEffect(()=>{
    
   async function fetchdata() {
        const res=await fetch('/api/services')
        const data = await res.json()
        console.log(data.services)
        setSalles(data.salles)
        setServices(data.services)
        setLoading(false)
   } 
   fetchdata()

},[])


    return (
      <div>

<h1 className="text-center text-4xl my-5 ">Services</h1>
             <div className="flex flex-wrap justify-around">   { !laoding? 
              
                services?.map(item=>
                      <button  onClick={()=>router.push(`services/${item._id}`)} key={item._id}  className={`hover:!z-10 w-[350px] my-10 h-[350px] shadow-md transform transition duration-500 ease-in-out bg-blue-300 cursor-pointer hover:scale-105 hover:bg-blue-500 hover:text-white`}>
                       
                        <h1 className="text-center font-bold p-5 text-xl">{item.name}</h1>
                        <h1 className="text-center font-bold p-5 text-xl">{item.location}</h1>

                      
                      </button>
                )   
                

              
              : Loading()
            }
        </div>

             
      </div>
    );
  }
  