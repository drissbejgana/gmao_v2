'use client'

import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Service } from "@/app/components/AddService";

export type User={
  _id:string;
  name:string;
  role:string;
  email:string;
  password:string;
  service:string;
}



const AddtoUsers = async (user:User) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Failed to add user');
  }

  const newuser = await response.json();
  console.log(newuser)
  return newuser;
};



export default function Page() {
  const [user,setUser]=useState<User>({
    _id:'',
    name:'',
    role:'Manager',
    email:'',
    password:'',
    service:''

  })
  const [referesh,setRefresh]=useState(false)

  const [users,setUsers]=useState<User[]>([])
  const [services,setServices]=useState<Service[]>([])

  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/api/auth/signin?callbackUrl=/");
  //   },
  // });


useEffect(()=>{
  async function fetchusers(){
         const res= await fetch('/api/users')
            if(res.ok){
              const data=await res.json()
               setUsers(data.users)
               setServices(data.services)
            }


    }
  
    fetchusers()

},[referesh])


 const handleDelete=async(id:string)=>{
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });

     setRefresh(!referesh)
  } catch (error:any) {
        throw Error('error deleting')
  }

 }
  const handleClick= async()=>{
     
    if(!user.name || !user.role || !user.email || !user.password){
      alert('fill the form')
      return
    }

  try {
    const newuser = await AddtoUsers(user);
    console.log('New user:', newuser);
    setUser({
      _id:'',
      name:'',
      role:'technician',
      email:'',
      password:'',
      service:''
  })
    alert("New User added")

    setRefresh(!referesh)
  } catch (error:any) {
    console.log(error.message);
    alert("ERR try again")

  }


  }

  // if( session?.user?.role != "admin" )
  //   return <>Forbidden</>

  return (
   <> 
      <h1 className="text-center text-4xl my-5 ">Users</h1>
         <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-3 '>
              {
               users.map((item:User)=>
                 <div className='product bg-white rounded group ' key={item._id}>

                                 <div className='px-2 py-5 '>
                                     <h3 className="text-xl text-[#303030] font-bold  flex items-center ">
                                   
 
                                     <div >
                                          <span>Name : {item.name}</span>  
                                            <br />
                                          <span className='text-sm'>Role : {item.role}</span> 
                                          <br />
                                          <span className='text-sm'>Email : {item.email}</span> 
                                          <br />

                                          <span className='text-sm'>Service : {
                                            services.find((srv:Service)=>srv._id==item.service)?.name
                                            }</span> 
                               
                                     </div>
                                 

                                     </h3> 
                                   <div className="flex">
                                     <button type="button" onClick={()=>handleDelete(item._id)} className="focus:outline-none my-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                     <button type="button" className="focus:outline-none my-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Edit</button>
                                   </div>
                                 </div>
 
 
                             </div>
 
                 )
              }
           
                
         </div>

        <div className="">
             <form className=" my-5 shadow  px-5 py-5 ">
         <h1 className="text-center text-3xl m-2">Add User</h1>

             <div className="mb-5">
                         <label htmlFor="lname"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                         <input type="text" onChange={(e:ChangeEvent<HTMLInputElement>)=>setUser({...user,name:e.currentTarget.value})}  id="lname" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
             </div>


             <div className="mb-5">
                 <label htmlFor="FormSelect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                 <select onChange={(e:ChangeEvent<HTMLSelectElement>)=>setUser({...user,role:e.currentTarget.value})} name="field"  id="FormSelect" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" aria-invalid="false">
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option> 
               </select>
               </div>

               <div className="mb-5">
                  <label htmlFor="FormSelect1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service</label>
                    <select  onChange={(e:ChangeEvent<HTMLSelectElement>)=>setUser({...user,service:e.currentTarget.value})} name="field1"  id="FormSelect1" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" aria-invalid="false">
                    <option selected disabled>Select Service</option>
                      {
                        services.map((item:Service)=>
                        <option key={item._id} value={item._id} >{item.name} ({item.location})</option>
                        
                        )
                      }

                </select>
              </div>

               <div className="mb-5">
                         <label htmlFor="email"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                         <input onChange={(e:ChangeEvent<HTMLInputElement>)=>setUser({...user,email:e.currentTarget.value})} type="email"  id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
               </div>
             

               <div className="mb-5">
                         <label htmlFor="password"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                         <input onChange={(e:ChangeEvent<HTMLInputElement>)=>setUser({...user,password:e.currentTarget.value})} type="text"  id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
               </div>

             <button type="button" onClick={handleClick}  className="text-white bg-[#009CA5] hover:bg-[#005F61] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-[#047BCA] dark:focus:ring-blue-800">Add</button>
             
         </form>
                 
        </div>
      

    
   </>
  );
}
