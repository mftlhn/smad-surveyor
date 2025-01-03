"use client"
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'
import React, { use } from 'react'

const AuthenticatedLayout = ({ children, head }) => {
    const router = useRouter();
    const currentPath = usePathname();
    const firstSegment = currentPath.split("/")[1];
  return (
    <div className='w-full h-full min-h-screen'>
      <header className="bg-gray-700 text-white p-4 w-full fixed top-0 z-50">
        <h1>
            {firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1)}
        </h1>
      </header>
      <main className='h-full mt-[75px] -z-100'>{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
        <ul className="flex justify-around">
          <li>
            <Link href="/dashboard" className={firstSegment === 'dashboard' ? 'text-white' : 'text-gray-500'}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/order" className={firstSegment === 'order' ? 'text-white' : 'text-gray-500'}>
              Order
            </Link>
          </li>
          <li>
            <Link href="/profile" className={firstSegment === 'profile' ? 'text-white' : 'text-gray-500'}>
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AuthenticatedLayout