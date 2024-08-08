'use client'
import { ChangeEvent, useEffect, useState } from "react";
import { Service } from "./AddService";



export type Salle={
    _id:string;
    name:string;
    service:string;
    equipments:[]
}


const AddtoSalles = async (task:Salle) => {
    const response = await fetch('/api/salles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add salle');
    }
  
    const newSalle = await response.json();
    console.log(newSalle)
    return newSalle;
  };
  
  





export default function AddSalle() {

    const [salle,setSalle]=useState<Salle>({
       _id:'',
        name:'',
        service:'',
        equipments:[]
    })

    const [services,setServices]=useState<Service[]>([])

 
    useEffect(()=>{
        
       async function fetchservices() {
            const res=await fetch('/api/services')
            const data = await res.json()
            setServices(data.services)
        
        
       } 
       fetchservices()

    },[])




    const handleClick= async()=>{
     
        if(!salle.name || !salle.service){
            alert('fill the form')
           return
        }
      try {
        const newsalle = await AddtoSalles(salle);
        console.log('New Salle:', newsalle);
        alert("New Salle added")
        location.reload()
    
      } catch (error:any) {
        console.log(error.message);
        alert("ERR try again")
    
      }
      
    }


  return (
        <>
            <form className=" my-5 shadow  px-5 py-5 ">
     <h1 className="text-center text-3xl m-2">Add Salle</h1>

        <div className="mb-5">
                    <label htmlFor="title"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" onChange={(e:ChangeEvent<HTMLInputElement>)=>setSalle({...salle,name:e.currentTarget.value})} name="title"  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
        </div>

        <div className="mb-5">
              <label htmlFor="FormSelect2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service</label>
                <select  onChange={(e:ChangeEvent<HTMLSelectElement>)=>setSalle({...salle,service:e.currentTarget.value})} name="field1"  id="FormSelect2" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" aria-invalid="false">
                 <option selected disabled>Select Service</option>
                  {
                    services.map((item:Service)=>
                     <option key={item._id} value={item._id} >{item.name} ({item.location})</option>
                    
                    )
                  }

            </select>
          </div>


         

          <button type="button" onClick={handleClick}  className="text-white bg-[#009CA5] hover:bg-[#005F61] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-[#047BCA] dark:focus:ring-blue-800">Add</button>
        
       </form>

        </>
  );
}
