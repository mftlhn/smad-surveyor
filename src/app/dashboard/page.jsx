"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNavBar from '@/components/BottomNavBar';

const DashboardPage = () => {
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem("smad-token");
            setToken(data);
        }
    }, []);

    useEffect( () => {
        if(token === null) return;
        if (!token) {
            router.push('/');
        }
    }, [token, router]);

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