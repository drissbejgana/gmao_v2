'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Service } from './AddService';
import { Salle } from './AddSalle';


export type Equipment ={
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
  
}

const AddtoEquipments = async (equipment:Equipment) => {
  const response = await fetch(`/api/stock/${equipment._id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(equipment),
  });

  if (!response.ok) {
    throw new Error('Failed to add equipment');
  }

  const newequipment = await response.json();
  return newequipment;
};


const AddEquipmentFromStock = () => {

 const [equipment,setEquipment]=useState<Equipment>({ _id:'',name:'',marque:'',service:'',quantite:0,etat:'bon',reference:'',referenceInterne:'',contactFournisseur:'',salle:''})

  const [equipments,setEquipments]=useState<Equipment[]>([])

const [services,setServices]=useState<Service[]>([])
const [salles,setSalles]=useState<Salle[]>([])

 
useEffect(()=>{
    
   async function fetchservices() {
        const res=await fetch('/api/services')
        const data = await res.json()
        setServices(data.services)

        const res1=await fetch('/api/stock')
        const stock = await res1.json()
        setEquipments(stock)
    
   } 
   fetchservices()

},[])

 

useEffect(()=>{
     if(!equipment.service){
        return
     }
     console.log('render')
async function fetchSallesbyService() {

    const res=await fetch(`/api/services/${equipment.service}`)
    const data = await res.json()
    setSalles(data.salles)


} 
fetchSallesbyService()

},[equipment.service])









const handleClick= async()=>{
   
  console.log(equipment)
  try {
    const newEquipment = await AddtoEquipments(equipment);
    console.log('New equipment:', newEquipment);
    setEquipment({_id:'',name:'',marque:'',service:'',quantite:0,etat:'',reference:'',referenceInterne:'',contactFournisseur:'',salle:''})
    alert("New equipment added")
   
  } catch (error:any) {
    console.log(error.message);
    alert("ERR try again")

  }
}  

  return (

        <form className=" my-5 shadow  px-5 py-5 ">
            <h1 className="text-center text-3xl m-2">Add Equipment From Stock</h1>

            <div className="mb-5">
                  <label htmlFor="FormSelect1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service</label>
                    <select  onChange={(e:ChangeEvent<HTMLSelectElement>)=>setEquipment({...equipment,_id:e.currentTarget.value})} name="field1"  id="FormSelect1" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" aria-invalid="false">
                    <option selected disabled>Select Equipment</option>
                      {
                        equipments.map((item:Equipment)=>
                        <option key={item._id} value={item._id} >{item.name} </option>
                        
                        )
                      }

                </select>
              </div>

            <div className="mb-5">
                        <label htmlFor="Quantite"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantite</label>
                        <input min={0} onChange={(e:ChangeEvent<HTMLInputElement>)=>setEquipment({...equipment,quantite:parseInt(e.currentTarget.value)})} type="number"   id="Quantite" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>

            <div className="mb-5">
                  <label htmlFor="FormSelect1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service</label>
                    <select  onChange={(e:ChangeEvent<HTMLSelectElement>)=>setEquipment({...equipment,service:e.currentTarget.value})} name="field1"  id="FormSelect1" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" aria-invalid="false">
                    <option selected disabled>Select Service</option>
                      {
                        services.map((item:Service)=>
                        <option key={item._id} value={item._id} >{item.name} ({item.location})</option>
                        
                        )
                      }

                </select>
              </div>

              <div className="mb-5">
                  <label htmlFor="FormSelect2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salle</label>
                    <select  onChange={(e:ChangeEvent<HTMLSelectElement>)=>setEquipment({...equipment,salle:e.currentTarget.value})} name="field1"  id="FormSelect2" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" aria-invalid="false">
                    <option selected disabled>Select Salle</option>
                      {
                        salles.map((item:Salle)=>
                        <option key={item._id} value={item._id} >{item.name}</option>
                        
                        )
                      }

                </select>
              </div>

            <button type="button" onClick={handleClick}  className="text-white bg-[#009CA5] hover:bg-[#005F61] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-[#047BCA] dark:focus:ring-blue-800">Add</button>
            
        </form>

  )
};

export default AddEquipmentFromStock;
