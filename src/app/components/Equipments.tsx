'use client'
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { Service } from './AddService';
import { Salle } from './AddSalle';
import { Equipment } from './AddEquipment';
import Link from 'next/link';
import { useReactToPrint } from 'react-to-print';
import { usePDF } from 'react-to-pdf';




const Equipments = () => {

const [equipments,setEquipments]=useState<Equipment[]>([])
const [services,setServices]=useState<Service[]>([])
const [salles,setSalles]=useState<Salle[]>([])
const [laoding,setLoading]=useState(true)


const componentRef = useRef<HTMLDivElement>(null);
  
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});

const { toPDF, targetRef } = usePDF({filename: 'Equipments'});

 
useEffect(()=>{
    
   async function fetchdata() {
        const res=await fetch('/api/equipments')
        const data = await res.json()
        setEquipments(data.equipments)
        setSalles(data.salles)
        setServices(data.services)
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
   <div ref={componentRef} className='h-[50vh] overflow-y-scroll'>
     <h1 className="text-center text-3xl m-5">All Equipments</h1>


          {!laoding ? <table ref={targetRef} className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                          Service
                          </th>
                           <th scope="col" className="px-6 py-3">
                          Salle
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

                        <td className="px-6 py-4 ">
                            <div className="flex items-center capitalize">
                              {item.etat=="bon"? <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> : <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>} {item.etat}
                            </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          {
                            services.find((service)=>service._id==item.service)?.name || ''
                          }
                        </td>
                        <td className="px-6 py-4">
                           { salles.find((service)=>service._id==item.salle)?.name || ''}
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
            </table>: Loading()
              
        }

    </div>
    <div className='flex jutsify-between '>
         <button
                  onClick={handlePrint}
                  type="button"
                  className="text-white m-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                Print
        </button>

        <button
                  onClick={() => toPDF()}
                  type="button"
                  className="text-white m-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                Telecharger .pdf
        </button>
    </div>
    </>
  )
};

export default Equipments;


export function Loading() {
  return <div className="flex mx-auto items-center justify-center w-56 h-56  dark:bg-gray-800 dark:border-gray-700">
  <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
  </div>
}