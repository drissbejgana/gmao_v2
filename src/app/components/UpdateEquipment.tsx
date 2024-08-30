'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Service } from './AddService';
import { Salle } from './AddSalle';
import { Equipment } from './AddEquipment';
import { Loading } from './Equipments';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import TransferEquipment from './TransferEquipment';
import AddRapportToEquipment from './AddRapportToEquipment';
import Rapports from './Rapports';




const UpdateEquipment = ({id,role}:{id:string,role:string}) => {

const [equipment,setEquipment]=useState<Equipment>({ _id:id,name:'',marque:'',service:'',quantite:0,etat:'bon',reference:'',referenceInterne:'',contactFournisseur:'',salle:''})
const [laoding,setLoading]=useState(true)

const [rapports,setRapports]=useState([])




useEffect(()=>{
     async function fecthequipment(){
        try {
          const response = await fetch(`/api/equipments/${id}`);
        
          if (!response.ok) {
            throw new Error('Failed');
          }
          const eq=await response.json()
          setEquipment(eq)
         setLoading(false)
        } catch (error:any) {
          console.log(error.message);
          alert("ERR try again")
      
        }
       }
       async function fetchdata() {
        setLoading(true)
        const res=await fetch(`/api/rapports/${id}`)
        const data = await res.json()
        setRapports(data.rapports)
        setLoading(false)
      } 
      
       fetchdata()
       fecthequipment()

},[id])






const handleClick= async()=>{
   

   if(!equipment.name || !equipment.etat || !equipment.marque || !equipment.quantite || !equipment._id){
    alert('must fill required fields')
    return
   }

  try {
    const response = await fetch(`/api/equipments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipment),
    });
  
    if (!response.ok) {
      throw new Error('Failed');
    }
    const eq= await response.json()
      setEquipment(eq)
    alert("Equipment has been updated successfuly")
   
  } catch (error:any) {
    console.log(error.message);
    alert("ERR try again")

  }
}  

  return (
   <> 
   <div className='grid grid-cols-1 md:grid-cols-2'>
       { !laoding? <form className=" my-5 shadow  px-5 py-5 ">
            <h1 className="text-center text-3xl m-2">Update Equipment</h1>


            <div className="mb-5">
                        <label htmlFor="lname"   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" disabled={role!="Admin"} value={equipment.name}  onChange={(e:ChangeEvent<HTMLInputElement>)=>setEquipment({...equipment,name:e.currentTarget.value})}  id="lname" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>


            <div className="mb-5">
                <label htmlFor="FormSelect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Etat</label>
                 <select onChange={(e:ChangeEvent<HTMLSelectElement>)=>setEquipment({...equipment,etat:e.currentTarget.value})} name="field"  id="FormSelect" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" aria-invalid="false">
                        <option selected={equipment.etat=="bon"} value="bon">Bon</option>
                        <option selected={equipment.etat=="panne"} value="panne">Panne</option>
              </select>
              </div>

              <div className="mb-5">
                        <label htmlFor="Marque"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marque</label>
                        <input disabled={role!="Admin"} value={equipment.marque} onChange={(e:ChangeEvent<HTMLInputElement>)=>setEquipment({...equipment,marque:e.currentTarget.value})} type="text"   id="Marque" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>

              <div className="mb-5">
                        <label htmlFor="Quantite"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantite</label>
                        <input disabled={role!="Admin"} value={equipment.quantite} onChange={(e:ChangeEvent<HTMLInputElement>)=>setEquipment({...equipment,quantite:parseInt(e.currentTarget.value)})} type="number"   id="Quantite" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>

              <div className="mb-5">
                        <label htmlFor="reference"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">reference</label>
                        <input disabled={role!="Admin"} value={equipment.reference} onChange={(e:ChangeEvent<HTMLInputElement>)=>setEquipment({...equipment,reference:e.currentTarget.value})} type="text"   id="reference" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>

                            
              <div className="mb-5">
                        <label htmlFor="referenceInterne"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">referenceInterne</label>
                        <input disabled={role!="Admin"} value={equipment.referenceInterne} onChange={(e:ChangeEvent<HTMLInputElement>)=>setEquipment({...equipment,referenceInterne:e.currentTarget.value})} type="text"   id="referenceInterne" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>

              <div className="mb-5">
                        <label htmlFor="contactFournisseur"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">contactFournisseur</label>
                        <input disabled={role!="Admin"} value={equipment.contactFournisseur} onChange={(e:ChangeEvent<HTMLInputElement>)=>setEquipment({...equipment,contactFournisseur:e.currentTarget.value})} type="text"   id="contactFournisseur" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>



            <button type="button" onClick={handleClick}  className="text-white bg-[#009CA5] hover:bg-[#005F61] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-[#047BCA] dark:focus:ring-blue-800">Update</button>
            
        </form> : Loading()
        }
        <div>

          <TransferEquipment equipment={equipment}/>
       { role=="Admin" && <AddRapportToEquipment equipment={equipment} />}

        </div>
    </div>
          { role=="Admin" && <Rapports equipments={[]} rapports={rapports} /> }
     </>
  )
};

export default UpdateEquipment;
