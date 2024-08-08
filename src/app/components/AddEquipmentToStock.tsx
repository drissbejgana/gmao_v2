'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Service } from './AddService';
import { Salle } from './AddSalle';
import { Equipment } from './AddEquipment';




const AddtoEquipments = async (equipment:Equipment) => {
  const response = await fetch('/api/stock', {
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


const AddEquipmentToStock = () => {

const [equipment,setEquipment]=useState<Equipment>({ _id:'',name:'',marque:'',service:'',quantite:0,etat:'bon',reference:'',referenceInterne:'',contactFournisseur:'',salle:''})
 



const handleClick= async()=>{
   
  console.log(equipment)
  try {
    const newEquipment = await AddtoEquipments(equipment);
    console.log('New equipment:', newEquipment);
    setEquipment({_id:'',name:'',marque:'',service:'',quantite:0,etat:'',reference:'',referenceInterne:'',contactFournisseur:'',salle:''})
    alert("New equipment added To Stock")
    location.reload()
   
  } catch (error:any) {
    console.log(error.message);
    alert("ERR try again")

  }
}  

  return (
    <div>

           





        <form className=" my-5 shadow  px-5 py-5 ">
            <h1 className="text-center text-3xl m-2">Add Equipment To Stock</h1>


            <div className="mb-5">
                        <label htmlFor="lname"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" onChange={(e:ChangeEvent<HTMLInputElement>)=>setEquipment({...equipment,name:e.currentTarget.value})}  id="lname" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>


            <div className="mb-5">
                <label htmlFor="FormSelect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Etat</label>
                 <select onChange={(e:ChangeEvent<HTMLSelectElement>)=>setEquipment({...equipment,etat:e.currentTarget.value})} name="field"  id="FormSelect" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" aria-invalid="false">
                        <option value="bon">Bon</option>
                        <option value="panne">Panne</option>
              </select>
              </div>

              <div className="mb-5">
                        <label htmlFor="Marque"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marque</label>
                        <input onChange={(e:ChangeEvent<HTMLInputElement>)=>setEquipment({...equipment,marque:e.currentTarget.value})} type="text"   id="Marque" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>

              <div className="mb-5">
                        <label htmlFor="Quantite"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantite</label>
                        <input onChange={(e:ChangeEvent<HTMLInputElement>)=>setEquipment({...equipment,quantite:parseInt(e.currentTarget.value)})} type="number"   id="Quantite" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>

              <div className="mb-5">
                        <label htmlFor="reference"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">reference</label>
                        <input onChange={(e:ChangeEvent<HTMLInputElement>)=>setEquipment({...equipment,reference:e.currentTarget.value})} type="text"   id="reference" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>

                            
              <div className="mb-5">
                        <label htmlFor="referenceInterne"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">referenceInterne</label>
                        <input onChange={(e:ChangeEvent<HTMLInputElement>)=>setEquipment({...equipment,referenceInterne:e.currentTarget.value})} type="text"   id="referenceInterne" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>

              <div className="mb-5">
                        <label htmlFor="contactFournisseur"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">contactFournisseur</label>
                        <input onChange={(e:ChangeEvent<HTMLInputElement>)=>setEquipment({...equipment,contactFournisseur:e.currentTarget.value})} type="text"   id="contactFournisseur" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>



            <button type="button" onClick={handleClick}  className="text-white bg-[#009CA5] hover:bg-[#005F61] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-[#047BCA] dark:focus:ring-blue-800">Add</button>
            
        </form>
    </div>
  )
};

export default AddEquipmentToStock;
