"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const BottomNavBar = () => {
    const currentPath = usePathname();
    const firstSegment = currentPath.split("/")[1];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 z-40">
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
    )
}

export default BottomNavBar