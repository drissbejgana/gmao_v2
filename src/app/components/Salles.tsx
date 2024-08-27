'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Salle } from './AddSalle';
import { useRouter } from 'next/navigation';
import { Loading } from './Equipments';



const Salles = ({service}:{service:string}) => {

const [salles,setSalles]=useState<Salle[]>([])
const [referesh,setRefresh]=useState(false)


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

},[service,referesh])


const handleDelete=async(id:string)=>{

  if (confirm("Do you want delete this salle!")) {

    try {
      const response = await fetch(`/api/salles/${id}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
        },
      });
         if(response.ok){
      alert('Salle deleted successfully')
       setRefresh(!referesh)
      }
    } catch (error:any) {
          throw Error('error deleting')
    }
  


  } 

}


  return (

    <>
         
     
         <h1 className="text-center text-4xl my-5 ">Salles</h1>
             <div className="flex flex-wrap justify-around">   { !laoding? 
              
                salles?.map(item=>
                  <div className='shadow px-5'>
                     <div className="flex justify-end px-4 pt-4">
                          <button onClick={()=>handleDelete(item._id)} type="button" className="text-white bg-red-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                            
                        </div>
                        <button   onClick={()=>router.push(`/salles/${item._id}`)} key={item._id}  className={`cuve w-[350px] my-10 h-[350px] shadow-md transform transition duration-500 ease-in-out bg-blue-300 cursor-pointer hover:scale-105 hover:bg-blue-500 hover:text-white`}>
                        <h1 className="text-center font-bold p-5 text-xl">{item.name}</h1>
                          
                      </button>
                 </div>
                )   
                

              
              : Loading()
            }
        </div>

    </>

  )
};

export default Salles;
