'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loading } from '@/app/components/Equipments';



 type EquipmentReforme ={
  _id:string;
  name:string;
  marque :string;
  service:string;
  quantite:number;
  etat:string;
  reference:string;
  referenceInterne:string;
  contactFournisseur:string;
  salle:string;
  to:string;
  date:string;

}


const Page = () => {

const [equipments,setEquipments]=useState<EquipmentReforme[]>([])
const [laoding,setLoading]=useState(true)
const [refersh,setRefresh]=useState(false)


 
useEffect(()=>{
    
   async function fetchdata() {
        const res=await fetch('/api/Reforme')
        const data = await res.json()
        console.log(data)
        setEquipments(data)
        setLoading(false)
   } 
   fetchdata()

},[refersh])



const handleRepaired =async(id:string)=>{
    try {
        const response = await fetch(`/api/Reforme/${id}`, {
          method: 'Delete',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if(response.ok){
          alert('Repaired successfully')
        }
        setRefresh(!refersh)
      } catch (error:any) {
            throw Error('error deleting')
      }
  
}
  const sendtoScrap=async(equipment:EquipmentReforme)=>{

    const response = await fetch('/api/scrap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipment),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add equipment');
    }
    else{
       alert('Add to Scrap successfully')
       setRefresh(!refersh)

    }
    

  

  }




  return (
    <div className='h-[50vh] overflow-y-scroll'>
     <h1 className="text-center text-3xl m-5">All Equipments (Reforme)</h1>


  {!laoding? <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Marque
                          </th>
                            <th scope="col" className="px-6 py-3">
                              Reference
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Reference Interne
                            </th>
                            <th scope="col" className="px-6 py-3">
                             Date 
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Company
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Action
                            </th>
                      </tr>
                  </thead>
                  
                  <tbody>
                      {
                        equipments?.map((item)=>
                          <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className=" px-6 py-4">
                          <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline" >
                            {item.name}
                          </span>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                              <div className="ps-3">
                                {item.marque}
                              </div>  
                          </th>

                          <td className="px-6 py-4">
                            {item.reference}
                          </td>
                          <td className="px-6 py-4">
                            {item.referenceInterne}
                          </td>
                          <td className="px-6 py-4">
                            {item.date}
                          </td>
                          <td className="px-6 py-4">
                            {item.to}
                          </td>
                         
                          <td className="px-6 flex  py-4">

                            <button onClick={()=>handleRepaired(item._id)} className="font-medium mx-2 text-blue-600 dark:text-blue-500 hover:underline" >Repaired</button>
                            <button onClick={()=>sendtoScrap(item)} className="font-medium mx-2 text-red-600 dark:text-red-500 hover:underline" >Scrap</button>
                  
                        </td>

                      </tr>)
                      }
          
          
          
          
            
                  </tbody>
              </table>: Loading()
  }

    </div>
  )
};

export default Page;
