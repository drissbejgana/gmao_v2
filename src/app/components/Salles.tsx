'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Salle } from './AddSalle';
import { redirect, useRouter } from 'next/navigation';
import { Loading } from './Equipments';




const Salles = ({service}:{service:string}) => {

const [salles,setSalles]=useState<Salle[]>([])


const router=useRouter()
const [laoding,setLoading]=useState(true)

useEffect(()=>{
    
   async function fetchSallesbyService() {
  
        const res=await fetch(`/api/services/${service}`)
        const data = await res.json()
      
        setSalles(data.salles)
        setLoading(false)
   } 
   fetchSallesbyService()

},[service])





  return (

    <>
              
         <h1 className="text-center text-4xl my-5 ">Salles</h1>
             <div className="grid gap-4 mb-5 md:mb-0 grid-cols-1 md:grid-cols-3 place-content-center place-items-center">   { !laoding? 
              
                salles?.map(item=>
                       <button  onClick={()=>router.push(`salles/${item._id}`)} key={item._id}  className={`cuve w-[350px] h-[350px] shadow-md transform transition duration-500 ease-in-out bg-blue-300 cursor-pointer hover:scale-105 hover:bg-blue-500 hover:text-white`}>
                       
                        <h1 className="text-center font-bold p-5 text-xl">{item.name}</h1>

                      
                      </button>
                )   
                

              
              : Loading()
            }
        </div>

    </>

  )
};

export default Salles;
