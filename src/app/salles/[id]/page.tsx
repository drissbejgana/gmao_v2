'use client'
import { Equipment } from "@/app/components/AddEquipment";
import { Salle } from "@/app/components/AddSalle";
import { Loading } from "@/app/components/Equipments";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


type Props={
    params:{id:string}
}


export default function Page({params}:Props) {

  const [equipments,setEquipments]=useState<Equipment[]>([])
  const [salle,setSalle]=useState<Salle>({
    _id:'',
    name:'',
    service:'',
    equipments:[]
  })

  const [laoding,setLoading]=useState(true)

 
useEffect(()=>{
    
   async function fetchdata() {
        const res=await fetch(`/api/salles/${params.id}`)
        const data = await res.json()
        setEquipments(data.equipments)
        setSalle(data.salle)
        setLoading(false)
   } 
   fetchdata()

},[])

 
const handleDelete=async(id:string)=>{
  try {
    const response = await fetch(`/api/equipments/${id}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.ok){
      alert('deleted successfully')
      location.reload()
      
    }

  } catch (error:any) {
        throw Error('error deleting')
  }

 }

        
  return (
    <>
      <div>
     <h1 className="text-center text-3xl m-5">All Equipments of {salle.name} </h1>


{ !laoding?<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Marque
                        </th>
                          <th scope="col" className="px-6 py-3">
                           Etat
                          </th>

                          <th scope="col" className="px-6 py-3">
                          Quantite
                          </th>
                          <th scope="col" className="px-6 py-3">
                          Reference
                          </th>
                          <th scope="col" className="px-6 py-3">
                          Reference Interne
                          </th>
                          <th scope="col" className="px-6 py-3">
                          Action
                          </th>
                    </tr>
                </thead>
                
                <tbody>
                    {
                      equipments.map((item)=>
                        <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className=" px-6 py-4">
                        <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={`/equipments/${item._id}`}>
                          {item.name}
                        </Link>
                      </td>
                      <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="ps-3">
                               {item.marque}
                            </div>  
                        </th>

                        <td className="px-6 py-4 ">
                            <div className="flex items-center capitalize">
                              {item.etat=="bon"? <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> : <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>} {item.etat}
                            </div>
                        </td>
                        

                        <td className="px-6 py-4">
                           {item.quantite}
                        </td>
                        <td className="px-6 py-4">
                           {item.reference}
                        </td>
                        <td className="px-6 py-4">
                           {item.referenceInterne}
                        </td>
                        <td className="px-6 flex  py-4">
                            <Link className="font-medium mx-2 text-blue-600 dark:text-blue-500 hover:underline" href={`/equipments/${item._id}`}>
                              Edit
                            </Link>

                            <button onClick={(e)=>handleDelete(item._id)} className="font-medium mx-2 text-red-600 dark:text-red-500 hover:underline" >Remove</button>
                  
                        </td>
                    </tr>)
                    }
        
        
        
        
          
                </tbody>
            </table>:Loading()}


    </div>
    </>
  );
  
}
