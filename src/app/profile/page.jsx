"use client"
import React from 'react'
import AuthenticatedLayout from '../AuthenticatedLayout'
import Cookies from 'js-cookie'

const ProfilePage = () => {
  const cookiesName = Cookies.get('smad-name')

  return (
    <AuthenticatedLayout head="Profile">
        <div className="p-4">
            <h2>Profile {cookiesName}</h2>
        </div>
    </AuthenticatedLayout>
  )
}

export default ProfilePage