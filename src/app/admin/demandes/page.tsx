'use client'

import { Loading } from "@/app/components/Equipments"
import { Demande } from "@/app/demande/page"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function Page() {

    const [demandes,setDemandes]=useState<Demande[]>([])
    const [laoding,setloading]=useState(true)
    const router=useRouter()

useEffect(()=>{
    async function fetchdata() {
        const res=await fetch('/api/demande')
        const data = await res.json()
       setDemandes(data)
       setloading(false)
    } 
    
    fetchdata()
    
},[])
   

  return (
  <>
       
                     
            <h1 className="text-center text-4xl my-5 ">Demandes</h1>
              <div className="grid gap-4 mb-5 md:mb-0 grid-cols-1 md:grid-cols-3 place-content-center place-items-center">   { !laoding? 
              
                demandes?.map(item=>
                       <button  onClick={()=>router.push(`demandes/${item._id}`)} key={item._id}  className={`cuve shadow-md transform transition duration-500 ease-in-out ${!item.is_New?'bg-red-300':'bg-green-300'} cursor-pointer hover:scale-105  hover:text-white`}>
                        <h1 className="text-center font-bold p-5 text-xl"> Request : {item._id}</h1>
                      </button>
                )   
                
              
              : Loading()
            }
        </div>
        
        </>
  );
}
