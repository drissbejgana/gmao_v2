'use client'
import React, { useState, useEffect } from 'react';
import { Loading } from '@/app/components/Equipments';
import { Equipment } from '@/app/components/AddEquipment';







const Page = () => {

const [equipments,setEquipments]=useState<Equipment[]>([])
const [equipment,setEquipment]=useState<{id:string,to:string,date:string}>({id:'',to:'',date:''})
const [laoding,setLoading]=useState(true)
const [refersh,setRefresh]=useState(false)


 
useEffect(()=>{
    
   async function fetchdata() {
        const res=await fetch('/api/Maintenance')
        const data = await res.json()
        setEquipments(data)
        setLoading(false)
   } 
   fetchdata()

},[refersh])

const handleRepaired =async(id:string)=>{
    try {
        const response = await fetch(`/api/Maintenance/${id}`, {
          method: 'Delete',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if(response.ok){
          alert('Repaired successfully')
        setRefresh(!refersh)

        }
      } catch (error:any) {
            throw Error('error deleting')
      }
    


}





const handlerforme=async(equipment:{id:string,to:string,date:string})=>{

  const response = await fetch('/api/Reforme', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(equipment),
  });

  if (!response.ok) {
    throw new Error('Failed to add equipment');
  }
  else {  
         alert('done')
         setRefresh(!refersh)
        }


}




  return (
    <> 
     <div className='h-[50vh] overflow-y-scroll'>
     <h1 className="text-center text-3xl m-5">All Equipments (Maintenance)</h1>


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
                         
                          <td className="px-6 flex  py-4">

                            <button onClick={()=>handleRepaired(item._id)} className="font-medium mx-2 text-blue-600 dark:text-blue-500 hover:underline" >Repaired</button>                

                        </td>

                      </tr>)
                      }
          
          
          
          
            
                  </tbody>
              </table>: Loading()
  }

    </div>

    <h1 className="text-center text-3xl m-2">Reforme Equipment</h1>

    <form className="p-4 md:p-5">
      <div className="grid gap-4 mb-4 grid-cols-2">


                        <div className="col-span-2 sm:col-span-1">
                              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Equipments</label>
                                <select onChange={(e)=>setEquipment({...equipment,id:e.target.value})} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                  <option selected>Select Equipment</option>
                                    {
                                      equipments?.map((item)=>
                                      <option   value={item._id}>{item.referenceInterne}</option>
                                      )
                                    }
                              </select>
                           </div>

                            <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                                        <input type="text" onChange={(e)=>setEquipment({...equipment,to:e.target.value})} name="company" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required/>
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                        <input type="date" onChange={(e)=>setEquipment({...equipment,date:e.target.value})} name="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required/>
                            </div>

            </div>
        <button type="button" onClick={()=>handlerforme(equipment)} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                              Reforme Equipment
        </button>
    </form>
 </>
  )
};

export default Page;
