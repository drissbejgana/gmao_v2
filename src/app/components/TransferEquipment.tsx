'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Service } from './AddService';
import { Salle } from './AddSalle';
import { Equipment } from './AddEquipment';


const TransferEquipment = ({equipment}: {equipment:Equipment}) => {

const [transfer,setTransfer]=useState({_id:'',equipment:equipment._id,service:'',salle:''})


const [services,setServices]=useState<Service[]>([])
const [equipments,setEquipments]=useState<Equipment[]>([])
const [salles,setSalles]=useState<Salle[]>([])
const [sallesByservice,setSallesByservice]=useState<Salle[]>([])
console.log(equipment)
useEffect(()=>{
    
    async function fetchdata() {
         const res=await fetch('/api/equipments')
         const data = await res.json()
         setEquipments(data.equipments)
         setSalles(data.salles)
         setServices(data.services)
     
    } 
    fetchdata()
 
 },[])
 
 
 
 useEffect(()=>{
      if(!transfer.service){
         return
      }
      console.log('render')
 async function fetchSallesbyService() {
 
     const res=await fetch(`/api/services/${transfer.service}`)
     const data = await res.json()
     setSallesByservice(data.salles)
 
 
 } 
 fetchSallesbyService()
 
 },[transfer.service])

const handleClick=async()=>{
        
        if(!transfer.equipment || !transfer.salle){
            alert('select the equipment and the salle')
            return
        }

        const response = await fetch(`/api/equipments/${transfer.equipment}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({salleId:transfer.salle}),
        });
      
        if (!response.ok) {
          throw new Error('Failed to add Leave');
        }
        else
        {alert('Equipment transferred successfully')
          location.reload()
        }
      


}

  return (
    <div>
        <form className=" my-5 shadow  px-5 py-5 ">
            <h1 className="text-center text-3xl m-2">Transfer Equipment</h1>




          <div className="mb-5">
               <label htmlFor="lname"   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name : </label>
               <input type="text"  value={ `${equipment.name} ( ${ services.find((service:Service)=>service._id==equipment.service)?.name} ${ salles.find((salle:Salle)=>salle._id==equipment.salle)?.name} )`}  disabled  id="lname" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>

            <div className="mb-5">
                  <label htmlFor="FormSelect1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Service (To)</label>
                    <select  onChange={(e:ChangeEvent<HTMLSelectElement>)=>setTransfer({...transfer,service:e.currentTarget.value})} name="field1"  id="FormSelect1" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" aria-invalid="false">
                    <option selected disabled>Select Service</option>
                      {
                        services.map((item:Service)=>
                        <option key={item._id} value={item._id} >{item.name} ({item.location})</option>
                        
                        )
                      }

                </select>
              </div>

              <div className="mb-5">
                  <label htmlFor="FormSelect2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Salle (To)</label>
                    <select  onChange={(e:ChangeEvent<HTMLSelectElement>)=>setTransfer({...transfer,salle:e.currentTarget.value})} name="field1"  id="FormSelect2" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" aria-invalid="false">
                    <option selected disabled>Select Salle</option>
                      {
                        sallesByservice.map((item:Salle)=>
                        <option key={item._id} value={item._id} >{item.name}</option>
                        
                        )
                      }

                </select>
              </div>


             
              

            <button type="button" onClick={handleClick}  className="text-white bg-[#009CA5] hover:bg-[#005F61] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-[#047BCA] dark:focus:ring-blue-800">Transfer</button>
            
        </form>
    </div>
  )
};

export default TransferEquipment;
