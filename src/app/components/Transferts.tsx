'use client'
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { Service } from './AddService';
import { Salle } from './AddSalle';
import { Loading } from './Equipments';
import { useReactToPrint } from 'react-to-print';
import { usePDF } from 'react-to-pdf';

type Transfer={
    _id:string;
    equipmentName:string;
    reference:string;
    oldservice:string;
    newservice:string;
    oldsalle:string;
    newsalle:string;
    date:string;

}


const Transferts = () => {

const [transferts,setTransferts]=useState<Transfer[]>([])
const [services,setServices]=useState<Service[]>([])
const [salles,setSalles]=useState<Salle[]>([])
const [laoding,setLoading]=useState(true)
const [referesh,setRefresh]=useState(false)

const componentRef = useRef<HTMLDivElement>(null);
  
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});

const { toPDF, targetRef } = usePDF({filename: 'Transferts'});

 
 
useEffect(()=>{
    
   async function fetchdata() {
        const res=await fetch('/api/transferts')
        const data = await res.json()
        setTransferts(data.transferts)
        setSalles(data.salles)
        setServices(data.services)
        setLoading(false)
   } 
   fetchdata()

},[referesh])


const handleDelete=async(id:string)=>{
  try {
    const response = await fetch(`/api/transferts/${id}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });
       if(response.ok){
  alert('tarnsfer deleted successfully'   )
     setRefresh(!referesh)
    }
  } catch (error:any) {
        throw Error('error deleting')
  }

 }

  return (
    <>
    <div className='h-[80vh] overflow-y-scroll' ref={componentRef}>
     <h1 className="text-center text-3xl m-5">All Transferts</h1>


          {!laoding ? <table ref={targetRef} className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                          Equipment Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Reference
                        </th>
                          <th scope="col" className="px-6 py-3">
                          old Service
                          </th>
                          <th scope="col" className="px-6 py-3">
                         New Service
                          </th>

                          <th scope="col" className="px-6 py-3">
                          Movement Date
                          </th>
                        
                          <th scope="col" className="px-6 py-3">
                        Action
                          </th>
                    </tr>
                </thead>

                <tbody>
                    {
                 transferts?.map((item)=>
                        <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className=" px-6 py-4">
                        <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline" >
                          {item.equipmentName}
                        </span>
                      </td>
                      <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="ps-3">
                               {item.reference}
                            </div>  
                        </th>

                        <td className="px-6 py-4">
                          {
                            services.find((service)=>service._id==item.oldservice)?.name || ''
                          }
                          <span className='mx-1'> ({salles.find((salle)=>salle._id==item.oldsalle)?.name || ''})</span>
                        </td>

                        <td className="px-6 py-4">
                          {
                            services.find((service)=>service._id==item.newservice)?.name || ''
                          }
                          <span className='mx-1'>({item.newsalle})</span>  
                        </td>

                        <td className="px-6 py-4">
                           {item.date}
                        </td>
                      <td className="px-6 flex  py-4">

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

export default Transferts;



