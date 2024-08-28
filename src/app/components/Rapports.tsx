'use client'
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { Service } from './AddService';
import { Salle } from './AddSalle';
import { Equipment } from './AddEquipment';
import Link from 'next/link';
import { useReactToPrint } from 'react-to-print';
import { usePDF } from 'react-to-pdf';




const Rapports = ({id}:{id:string}) => {

const [rapports,setRapports]=useState([])
const [filtredrapports,setfiltredRapports]=useState([])

const [laoding,setLoading]=useState(true)
const [byMaintenance,setbyMaintenance]=useState('')


const componentRef = useRef<HTMLDivElement>(null);
  
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});

const { toPDF, targetRef } = usePDF({filename: 'Rapports'});

   




useEffect(()=>{
  
  async function fetchdata() {
    setLoading(true)
    const res=await fetch(`/api/rapports/${id}`)
    const data = await res.json()
    setRapports(data)
    setfiltredRapports(data)
    setLoading(false)
  } 
  
   fetchdata()

},[])


useEffect(()=>{
  
  if(byMaintenance=='All'){
     setfiltredRapports(rapports)
    return
  }
  
   const filtred=rapports.filter((item:any)=>item.maintenance.toUpperCase().startsWith(byMaintenance.toUpperCase()))
   setfiltredRapports(filtred)
   
},[byMaintenance])





  return (
   <> 
   <div ref={componentRef} className='overflow-y-scroll'>
     <h1 className="text-center text-3xl m-5">Rapports</h1>

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">


<div className="flex mx-5 flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                  <div>
                      <label htmlFor="FormSelect1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">By Etat</label>
                      <select  onChange={(e:ChangeEvent<HTMLSelectElement>)=>setbyMaintenance(e.currentTarget.value)} name="field1"  id="FormSelect1" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" aria-invalid="false">
            
                                          <option selected value={'All'} >All</option>
                                          <option  value={'curative'} >Curative</option>
                                          <option  value={'preventive'} >Preventive</option>
                      </select>
                    </div> 
       
  </div>

          {!laoding ? <table ref={targetRef} className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                             Problème signalé
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Maintenance
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Link
                       </th>
                          
                    </tr>
                </thead>
                
                <tbody >
                    {
                filtredrapports?.map((item:any)=>
                        <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th className=" px-6 py-4">
                            <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline" >
                                {item.name}
                            </span>
                          </th>
                          
                          <td className=" px-6 py-4">
                              <div className="ps-3">
                                {item.maintenance}
                              </div>  
                          </td>

                          <td className=" px-6 py-4">
                              <div className="ps-3">
                                {item.date}
                              </div>  
                          </td>

                       <td className=" px-6 py-4">
                        <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline" >
                          <Link target="_blank" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={`https://cliniquerrahma.ma/uploads/${item.url}`}>
                              Link
                          </Link>
                        </span>
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

export default Rapports;


export function Loading() {
  return <div className="flex mx-auto items-center justify-center w-56 h-56  dark:bg-gray-800 dark:border-gray-700">
  <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
  </div>
}