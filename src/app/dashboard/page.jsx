"use client";
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({ children }) => {
    return (
        <div>
            <header>
                <h1>Dashboard</h1>
                {/* Add your navigation here */}
            </header>
            <main>{children}</main>
        </div>
    );
};

const DashboardPage = () => {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('smad-token');
        if (!token) {
            router.push('/');
        }
    }, [router]);

    return (
        <DashboardLayout>
            <h2>Welcome to the Dashboard</h2>
            {/* Add your dashboard content here */}
        </DashboardLayout>
    );
};

export default DashboardPage;