'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Service } from './AddService';
import { Salle } from './AddSalle';
import { Equipment } from './AddEquipment';
import Link from 'next/link';
import Salles from './Salles';
import { useRouter } from 'next/navigation';
import { Loading } from './Equipments';




const Services = () => {

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
     <h1 className="text-center text-3xl m-5">All Services</h1>


           { !laoding? <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Salles
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                          Action
                        </th> */}
                        
                    </tr>
                </thead>
                
                <tbody>
                    {
                      services?.map((item)=>
                        <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th className=" px-6 py-4">
                        <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={`#`}>
                          {item.name}
                        </Link>
                      </th>
                      <td scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="ps-3">
                               {item.location}
                            </div>  
                      </td>

                      <td className="px-6 py-4">
                           <select onChange={(e)=>router.push(`/salles/${e.currentTarget.value}`)}   name="field1"  id="FormSelect2" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" aria-invalid="false">
                                    <option selected disabled value="salles">salles</option>
                                  {
                                      item.salles.map((salle)=>
                                        <option  key={salle}  value={salle}>
                                            {salles.find((sall)=>sall._id===salle)?.name}
                                    
                                        </option>
                                            )
                                    }

                           </select>
                        </td>

                      
                    </tr>)
                    }
        
        
        
        
          
                </tbody>
            </table>: Loading()
            }

    </div>
  )
};

export default Services;
