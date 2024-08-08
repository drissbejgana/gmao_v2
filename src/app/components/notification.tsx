'use client'
import { initFlowbite } from 'flowbite'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Demande } from '../demande/page';




export default  function Notification() {


  
 const [notification,setNotification]=useState(0)

    useEffect(()=>{
    initFlowbite()

        async function fetchdata() {
            const res=await fetch('/api/demande')
            const data = await res.json()
            const newdemandes=data.filter((item:Demande)=>item.is_New==true)
            setNotification(newdemandes.length)

        } 

        fetchdata()


},[notification])








    return (
        <li>
        <Link href={'/admin/demandes'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            
              <button type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Demandes
                <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                {notification}
                </span>
                </button>

            </Link>
    </li>
    )
}
