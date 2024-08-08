'use client'
import { ChangeEvent, useEffect, useState } from "react";
import { Salle } from "../components/AddSalle";
import { Demande } from "../demande/page";
import { Service } from "./AddService";






export default function Request({serviceID,serviceName}:{serviceID:string,serviceName:string}) {
      const [demande,setDemande]=useState<Demande>({_id:'',name:'',nameEquipment:'',service:'',is_New:true,salle:'',message:''})
      const [service,setService]=useState<Service>({ 
        _id:'',
        name:'',
        location:'',
        salles:[]
    }
    )


      const [salles,setSalles]=useState<Salle[]>([])


    useEffect(()=>{
          
         async function fetchSallesbyService() {
        
              const res=await fetch(`/api/services/${serviceID}`)
              const data = await res.json()
              console.log(data)
              setService(data.service)
              setSalles(data.salles)
         } 

         console.log('done')
         fetchSallesbyService()
      
      },[serviceID])



      const handleClick = async () => {
      
        const updatedDemande = {
          ...demande,
          service: service.name,
          name: serviceName || '',
        };
      
        try {

          const response = await fetch('/api/demande', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDemande),
          });
      

          if (!response.ok) {
            throw new Error('Failed to send demande');
          }

          alert('Demande sent successfully');
        } catch (error) {

          console.error('Error:', error);
          alert('Failed to send demande');
        }
      };
      


  return (
    <div className="">
       <form className=" my-5 shadow  px-5 py-5 ">
            <h1 className="text-center text-3xl m-2">Request an Equipment</h1>

            <div className="mb-5">
                    <label htmlFor="nameEquipment"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Equipment Name </label>
                   <input onChange={(e:ChangeEvent<HTMLInputElement>)=>setDemande({...demande,nameEquipment:e.currentTarget.value})} type="text"   id="nameEquipment" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>

              <div className="mb-5">
                  <label htmlFor="FormSelect2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">For Salle</label>
                    <select  onChange={(e:ChangeEvent<HTMLSelectElement>)=>setDemande({...demande,salle:e.currentTarget.value})} name="field1"  id="FormSelect2" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" aria-invalid="false">
                    <option selected disabled>Select Salle</option>
                      {
                        salles?.map((item:Salle)=>
                        <option key={item._id} value={item.name} >{item.name}</option>
                        
                        )
                      }

                </select>
              </div>
               <div className="mb-5">
                     <label htmlFor="nameEquipment"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Message</label>
                    <textarea onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>setDemande({...demande,message:e.currentTarget.value})} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

            <button type="button" onClick={handleClick}  className="text-white bg-[#009CA5] hover:bg-[#005F61] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-[#047BCA] dark:focus:ring-blue-800">Add</button>
            
        </form>

    </div>
  );
}
