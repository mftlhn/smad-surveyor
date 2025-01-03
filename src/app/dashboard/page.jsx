"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNavBar from '@/components/BottomNavBar';

const DashboardPage = () => {
    // const router = useRouter();
    // const token = Cookies.get('smad-token');
    const token = localStorage.getItem('smad-token');

    useEffect( () => {
        if (!token) {
            router.push('/');
        }
    }, [token]);

    return (
        <>
            <Header title={'Dashboard'}/>
            <div className="w-full h-full mt-[15%]">
                <div className='w-full h-full bg-red-500'>
                    <h1>Dashboard</h1>
                </div>
            </div>
            <BottomNavBar />
        </>
    );
};

export default DashboardPage;