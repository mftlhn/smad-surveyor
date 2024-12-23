"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import AuthenticatedLayout from '../AuthenticatedLayout';

const DashboardPage = () => {
    const router = useRouter();
    const [dataSurvey, setDataSurvey] = useState([]);

    const token = Cookies.get('smad-token');
    const fetchOrders = async () => {

        try {
            const response = await fetch(`/api/order/${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setDataSurvey(data.data);
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    useEffect( () => {
        if (!token) {
            router.push('/');
        }
        fetchOrders();
    }, [router.ok]);

    return (
        <AuthenticatedLayout head="Dashboard">

        </AuthenticatedLayout>
    );
};

export default DashboardPage;