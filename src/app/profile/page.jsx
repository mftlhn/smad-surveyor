"use client"
import React from 'react'
import Cookies from 'js-cookie'
import Header from '@/components/Header'
import BottomNavBar from '@/components/BottomNavBar'

const ProfilePage = () => {
  const cookiesName = Cookies.get('smad-name')

  return (
    // <AuthenticatedLayout head="Profile">
    //     <div className="p-4">
    //         <h2>Profile {cookiesName}</h2>
    //     </div>
    // </AuthenticatedLayout>
    <>
      <Header title={'Profile'}/>
        <div className="w-full h-full mt-[15%]">
          <div className='w-full h-full bg-red-500'>
            <h1>Profile</h1>
          </div>
        </div>
      <BottomNavBar />
    </>
  )
}

export default ProfilePage