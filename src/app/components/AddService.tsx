'use client'

import { ChangeEvent, useState } from "react";





export type Service={
    _id:string;
    name:string;
    location:string;
    salles:[]
}




const AddtoServices = async (task:Service) => {
    const response = await fetch('/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add Service');
    }
  
    const newService = await response.json();
    console.log(newService)
    return newService;
  };
  
  





export default function AddService() {

    const [service,setService]=useState<Service>({
       _id:'',
        name:'',
        location:'',
        salles:[]
    })


    const handleClick= async()=>{
     
        if(!service.name || !service.location){
            alert('fill the form')
           return
        }
      try {
        const newuser = await AddtoServices(service);
        console.log('New Service:', newuser);
        alert("New Service added")
        location.reload()

    
      } catch (error:any) {
        console.log(error.message);
        alert("ERR try again")
    
      }
      
    }


  return (
        <>
            <form className=" my-5 shadow  px-5 py-5 ">
     <h1 className="text-center text-3xl m-2">Add Service</h1>

        <div className="mb-5">
                    <label htmlFor="title"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" onChange={(e:ChangeEvent<HTMLInputElement>)=>setService({...service,name:e.currentTarget.value})} name="title"  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
        </div>

        <div className="mb-5">
              <label htmlFor="FormSelect2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                <select  onChange={(e:ChangeEvent<HTMLSelectElement>)=>setService({...service,location:e.currentTarget.value})} name="field1"  id="FormSelect2" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" aria-invalid="false">
                 <option selected disabled>Select Location</option>
                 <option value={"premieretage"} >premier etage</option>
                 <option value={"Deuxiemeetage"} >Deuxieme etage</option>
                 <option value={"Rez-de-chaussee"} >Rez-de-chausseé</option>
                 <option value={"moins-un"} >moins un</option>
                 <option value={"moins-deux"} >moins deux</option>
                    <option value={"moins-trois"} >moins trois</option>

            </select>
          </div>


         

          <button type="button" onClick={handleClick}  className="text-white bg-[#009CA5] hover:bg-[#005F61] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-[#047BCA] dark:focus:ring-blue-800">Add</button>
        
       </form>

        </>
  );
}
