"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import AuthenticatedLayout from '../AuthenticatedLayout';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OrderPage = () => {
  const router = useRouter();
  const [dataSurvey, setDataSurvey] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(dataSurvey);
  
  const token = Cookies.get('smad-token');
  const fetchOrders = async () => {

  try {
    setIsLoading(true);
    const response = await fetch(`/api/order/${token}`, {
      method: 'GET',
        headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDataSurvey(data.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
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
    <AuthenticatedLayout head="Order">
      <div className='px-2 mt-5'>
        {
          isLoading ? (
            <>
              <div className='flex flex-col space-y-3'>
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </>
          ) : (
            <>
              {
                dataSurvey.map((item, index) => (
                  <div key={index} className='flex flex-col space-y-3'>
                    <Card className={index === dataSurvey.length - 1 ? 'mb-20' : 'mb-5'}>
                      <CardHeader>
                        <CardTitle>{item.customer.store_name}</CardTitle>
                      </CardHeader>
                      <CardContent className='grid grid-cols gap-2'>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {item.customer.owner_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.customer.owner_phone_number}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))
              }
            </>
          )
        }
      </div>
    </AuthenticatedLayout>
  )
}

export default OrderPage