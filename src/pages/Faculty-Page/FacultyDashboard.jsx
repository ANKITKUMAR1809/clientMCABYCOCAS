import React, { useContext, useEffect, useState } from 'react'
import FacultyContext from '../../context/FacultyContext'
import AddNotification from '../../components/AddNotification';
import YourNotification from '../../components/YourNotification';

const FacultyDashboard = () => {
  const [activated,setActivated]=useState('AN')
  const [loading,setLoading]=useState(false)
  const { user,loggedIn}= useContext(FacultyContext);
  useEffect(()=>{
    if(user){
      setLoading(true)
    } 
    else{
      setLoading(false)
    }
  })
  if(!loading){
    return (
      <h1>Loading...</h1>
    )
  }
  return (
    <div className='min-h-screen w-full flex flex-wrap md:flex-nowrap justify-start items-start'>
      {/* menu */}
      <div className=' md:w-2/8 w-full md:min-h-screen border-r-2 border-black'>
        <p className='text-xl font-semibold text-center mt-2'>{user.name} Dashboard</p>
        <div className="max-w-3/4 mx-auto my-2 border-t-2 border-gray-900"></div>
        <ul className='flex md:flex-col gap-8 mt-8 '>
          <li className='text-lg font-semibold text-blue-950 hover:bg-amber-500 py-4 w-full text-center ' onClick={()=>setActivated('AN')}>Add Notification</li>
          <li className='text-lg font-semibold text-blue-950 hover:bg-amber-500 py-4 w-full text-center ' onClick={()=>setActivated('YN')}>Your Notification</li>
        
        </ul>
      </div>
      {/* its Page */}
      <div className=' w-full md:min-h-screen'>
        {activated==='AN'?<AddNotification/>:activated==="YN"?<YourNotification/>:""}
      </div>
    </div>
  )
}

export default FacultyDashboard