'use client'
import { initFlowbite } from 'flowbite'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Equipment } from './AddEquipment';




export default  function EtatNotification() {

 const [notification,setNotification]=useState(0)
 const [equipments,setEquipments]=useState<Equipment[]>([])

 useEffect(()=>{
    initFlowbite()
        async function fetchdata() {
            const res=await fetch('/api/equipments')
            const data = await res.json()
            const panne=data.equipments.filter((item:Equipment)=>item.etat=='panne')
            setEquipments(panne)
            setNotification(panne.length)
        } 

        fetchdata()


},[notification])





    return (
        <>
        


        <button type="button" id="dropdownNotificationButton" data-dropdown-toggle="dropdownNotification" className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
            </svg>

        <span className="sr-only">Notifications</span>
  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{notification}</div>
</button>


<div id="dropdownNotification" className="z-20 hidden w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
  <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
  </div>
  <div className="divide-y divide-gray-100 dark:divide-gray-700">
    {
        equipments?.map((item:Equipment)=>
        <Link href={`/equipments/${item._id}`} className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex-shrink-0">
                {/* <img className="rounded-full w-11 h-11" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"/> */}
                <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z"/>
                    <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z"/>
                </svg>
                </div>
            </div>
            <div className="w-full ps-3">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New Panne from <span className="font-semibold text-gray-900 dark:text-white">{item.name}-{item.marque} </span></div>
                <div className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
            </div>
        </Link>
        ) 
}
  </div>
  <Link href={'/pannes'} className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
      <div className="inline-flex items-center ">
        <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
          <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
        </svg>
          View all
      </div>
  </Link>
</div>

        </>
    )
}
