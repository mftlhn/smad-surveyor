"use client"
import { useRouter, usePathname } from 'next/navigation'
import React, { use } from 'react'

const AuthenticatedLayout = ({ children, head }) => {
    const router = useRouter();
    const currentPath = usePathname();

  return (
    <div>
      <header className="bg-gray-700 text-white p-4 w-full">
        <h1>
            {head}
        </h1>
      </header>
      <main>{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 shadow-lg">
        <ul className="flex justify-around">
          <li>
            <button onClick={() => router.push('/dashboard')} className={currentPath === '/dashboard' ? 'text-white' : 'text-gray-500'}>Dashboard</button>
          </li>
          <li>
            <button onClick={() => router.push('/order')} className={currentPath === '/order' ? 'text-white' : 'text-gray-500'}>Order</button>
          </li>
          <li>
            <button onClick={() => router.push('/profile')} className={currentPath === '/profile' ? 'text-white' : 'text-gray-500'}>Profile</button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AuthenticatedLayout