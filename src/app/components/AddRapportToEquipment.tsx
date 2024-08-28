'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Equipment } from './AddEquipment';

 export type Rapport={
  _id:string;name:string;url:string;equipmentID:string;date:string;maintenance:string;salle:string
}

const AddtoRapport = async (rapport:Rapport) => {
  console.log(rapport)
  const response = await fetch('/api/rapports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rapport),
  });

  if (!response.ok) {
    throw new Error('Failed to add Rapport');
  }

  const neweRapport = await response.json();
  return neweRapport;
};


const AddRapportToEquipment = ({equipment}: {equipment:Equipment}) => {
   
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [rapport, setRapport] = useState<Rapport>({_id:'',name:'',url:'',equipmentID:equipment._id,date:'',maintenance:'preventive',salle:equipment.salle});
  
    const handleFileChange = (e:any) => {
      setFile(e.target.files[0]);
    };
  

    const handleUpload = async (e:any) => {
      e.preventDefault();

      console.log(rapport)
      
      if (!file) {
        setMessage('Please select a file .');
        return;
      }
  
      const formData = new FormData();

      formData.append('file', file);
  
      try {
 
        const response = await fetch('https://cliniquerrahma.ma/upload.php', {

          method: 'POST',
          body: formData,
        });
  
        const result = await response.json();
        await AddtoRapport({...rapport,url:result.file,salle:equipment.salle})
        setMessage(result.message);
        location.reload()

      } catch (error) {
        console.error(error);
        setMessage('File upload failed.');
      }

    };
  
    return (
      <div>
        <form  className=" my-5 shadow  px-5 py-5 " onSubmit={handleUpload}>

         <h1 className="text-center text-3xl m-2">Add Rapport </h1>
      
            <div className="mb-5">
               <label htmlFor=""  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name : </label>
               <input type="text"  value={equipment.name}  disabled  id="lname" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>

           <div className='mb-5'>
                 <label htmlFor="maintenance">Maintenance</label>
                 <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" onChange={(e)=>setRapport({...rapport,maintenance:e.currentTarget.value})} name="maintenance" id="">
                      <option value="preventive">Preventive</option>
                      <option value="curative">Curative</option>
                 </select>
           </div>
           <div className='mb-5'>
              <label htmlFor="date">Date</label>
              <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" onChange={(e)=>setRapport({...rapport,date:e.currentTarget.value})} type="date" name="date" id="" />
           </div>

            <div className="mb-5">
               <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Problème signalé : </label>
               <input type="text" onChange={(e)=>setRapport({...rapport,name:e.currentTarget.value})}  id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>

            <div className="mb-5">
                <label htmlFor="file"   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Rapport : </label>
                <input type="file" name='file' onChange={handleFileChange} /> 
            </div>
          <button className="text-white bg-[#009CA5] hover:bg-[#005F61] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-[#047BCA] dark:focus:ring-blue-800" type="submit">Add Rapport</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
};

export default AddRapportToEquipment;
