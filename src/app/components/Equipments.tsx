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
const [filtredEquipments,setfiltredEquipments]=useState<Equipment[]>([])
const [services,setServices]=useState<Service[]>([])
const [salles,setSalles]=useState<Salle[]>([])
const [laoding,setLoading]=useState(true)
const [search,setSearch]=useState('')
const [byEtat,setbyEtat]=useState('')


const componentRef = useRef<HTMLDivElement>(null);
  
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});

const { toPDF, targetRef } = usePDF({filename: 'Equipments'});

   




useEffect(()=>{
  
  async function fetchdata() {
    setLoading(true)
    const res=await fetch('/api/equipments')
    const data = await res.json()
    setEquipments(data.equipments)
    setfiltredEquipments(data.equipments)
    setSalles(data.salles)
    setServices(data.services)
    setLoading(false)
  } 
  
   fetchdata()

},[])

useEffect(()=>{

  if(search=='' || filtredEquipments.length<=0){
    setfiltredEquipments(equipments)
    return
  }
   const filtred=equipments.filter((item)=>item.name.toUpperCase().startsWith(search.toUpperCase()))
   setfiltredEquipments(filtred)

},[search])


useEffect(()=>{
  
  if(byEtat=='All' || filtredEquipments.length<=0 ){
    setfiltredEquipments(equipments)
    return
  }
  
   const filtred=equipments.filter((item)=>item.etat.toUpperCase().startsWith(byEtat.toUpperCase()))
   setfiltredEquipments(filtred)
   
},[byEtat])





  return (
   <> 
   <div ref={componentRef} className='h-[50vh] overflow-y-scroll'>
     <h1 className="text-center text-3xl m-5">All Equipments</h1>

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">


<div className="flex mx-5 flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                  <div>
                      <label htmlFor="FormSelect1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">By Etat</label>
                      <select  onChange={(e:ChangeEvent<HTMLSelectElement>)=>setbyEtat(e.currentTarget.value)} name="field1"  id="FormSelect1" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" aria-invalid="false">
            
                                          <option selected value={'All'} >All</option>
                                          <option  value={'Bon'} >Bon</option>
                                          <option  value={'Panne'} >Panne</option>
                      </select>
                    </div> 
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="table-search" onChange={(e)=>setSearch(e.currentTarget.value)}  className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Equipment"/>
        </div>
    </div>

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
                          {/* <th scope="col" className="px-6 py-3">
                           Action
                          </th> */}
                    </tr>
                </thead>
                
                <tbody>
                    {
                filtredEquipments?.map((item)=>
                        <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className=" px-6 py-4">
                        <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline" >
                          <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={`/equipments/${item._id}`}>
                            {item.name}
                          </Link>
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
                            services?.find((service)=>service._id==item.service)?.name || ''
                          }
                        </td>
                        <td className="px-6 py-4">
                           { salles?.find((service)=>service._id==item.salle)?.name || ''}
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

                    </tr>)


                    }
        
        
        
        
          
                </tbody>
            </table>: Loading()
              
        }

    </div>
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