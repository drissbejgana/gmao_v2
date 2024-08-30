'use client'
import { Rapport } from '@/app/components/AddRapportToEquipment';
import { Loading } from '@/app/components/Equipments';
import Link from 'next/link';
import React, { useState, useEffect, ChangeEvent } from 'react';


type Props = {
    params: { id: string };
  };
  


  const UpdateRapport = async (rapport:Rapport,id:string) => {
    console.log(rapport)
    const response = await fetch(`/api/rapports/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rapport),
    });
    if (!response.ok) {
      throw new Error('Failed to Update Rapport');
    }
  
    const neweRapport = await response.json();
    return neweRapport;
  };


export default function Page({params}:Props) {

const [rapport, setRapport] = useState<Rapport>({_id:'',name:'',url:'',equipmentID:'',date:'',maintenance:'preventive',salle:''});
const [laoding,setLoading]=useState(true)
const [message, setMessage] = useState('');
const [file, setFile] = useState(null);



const handleFileChange = (e:any) => {
  setFile(e.target.files[0]);
};


useEffect(()=>{
     async function fecthRapport(){
        try {
          const response = await fetch(`/api/rapports/${params.id}`);
        
          if (!response.ok) {
            throw new Error('Failed');
          }
          const rapp=await response.json()
          setRapport(rapp.rapport)
          setLoading(false)
        } catch (error:any) {
          console.log(error.message);
          alert("ERR try again")
      
        }
       }
       fecthRapport()

},[params.id])


const handleUpload = async (e:any) => {
  e.preventDefault();

  if(!rapport.name || !rapport.date || !rapport.url || !rapport.maintenance ){
    alert('must fill required fields')
    return
   }
  


  const formData = new FormData();

  formData.append('file', file||rapport.url);

  try {

    const response = await fetch('https://cliniquerrahma.ma/upload.php', {

      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    await UpdateRapport({...rapport,url:result.file},params.id)
    setMessage(result.message);
  
    alert("Rapport has been updated successfuly")
    location.reload()

  } catch (error) {
    console.error(error);
    setMessage('File upload failed.');
    alert("ERR try again")

  }

};



  return (

     <div className='grid grid-cols-1 md:grid-cols-2'>
      { !laoding ? 
            <form  className=" my-5 shadow  px-5 py-5 " onSubmit={handleUpload}>

            <h1 className="text-center text-3xl m-2">Update Rapport </h1>
             
              <div className='mb-5'>
                    <label htmlFor="maintenance">Maintenance</label>
                    <select value={rapport.maintenance} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" onChange={(e)=>setRapport({...rapport,maintenance:e.currentTarget.value})} name="maintenance" id="">
                         <option value="preventive">Preventive</option>
                         <option value="curative">Curative</option>
                    </select>
              </div>
              <div className='mb-5'>
                 <label htmlFor="date">Date</label>
                 <input value={rapport.date} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" onChange={(e)=>setRapport({...rapport,date:e.currentTarget.value})} type="date" name="date" id="" />
              </div>
   
               <div className="mb-5">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Problème signalé : </label>
                  <input value={rapport.name} type="text" onChange={(e)=>setRapport({...rapport,name:e.currentTarget.value})}  id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
               </div>
   
               <div className="mb-5">
                     <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline" >
                          <Link target="_blank" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={`https://cliniquerrahma.ma/uploads/${rapport.url}`}>
                              {rapport.url}
                          </Link>
                      </span>
                   <label htmlFor="file"   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Rapport : </label>
                   <input  type="file" name='file' onChange={handleFileChange} /> 
               </div>
             <button className="text-white bg-[#009CA5] hover:bg-[#005F61] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-[#047BCA] dark:focus:ring-blue-800" type="submit">Save</button>
           </form>
           : Loading()
          }
        {message && <p>{message}</p>}

     </div>
      

  );
};


