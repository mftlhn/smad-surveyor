"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import BottomNavBar from '@/components/BottomNavBar';

const OrderPage = () => {
  const router = useRouter();
  const [dataSurvey, setDataSurvey] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);

  // console.log(dataSurvey);
  // ini jgn begini, seluruh hooks buat aja di components
  
  // const token = Cookies.get('smad-token');
  // const token = localStorage.getItem('smad-token');
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
      fetchOrders();
  }, [token, router]);

  return (
    <>
      <Header title={'Order'}/>
      <div className='px-2 overflow-y-scroll h-full mt-[17%]'>
        {
          isLoading ? (
            [1,2,3,4,5,6,7,8,9,10].map((item, index) => (
              <div key={index}>
                <div className='flex flex-col space-y-3 mb-3'>
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
              
            ))
          ) : (
            <>
              {
                dataSurvey.length === 0 ? (
                  <div className='flex flex-col space-y-3'>
                    <div className="space-y-2">
                      <p className="text-sm font-medium leading-none">
                        Belum ada order
                      </p>
                    </div>
                  </div>
                ) :
                dataSurvey.map((item, index) => (
                  <div key={index} className='flex flex-col space-y-3'>
                    <Card
                      onClick={() => router.push(`/order/${item.id}`)}
                      className={index === dataSurvey.length - 1 ? 'mb-20 cursor-pointer' : 'mb-5 cursor-pointer'} 
                    >
                      <CardHeader>
                        <CardTitle>{item.customer.store_name}</CardTitle>
                      </CardHeader>
                      <CardContent className='flex justify-between'>
                        <div className="space-y-2">
                          <p className="text-sm font-medium leading-none">
                            {item.customer.owner_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.customer.owner_phone_number}
                          </p>
                        </div>
                        {
                          item.is_open ? (
                            <span className="flex h-4 w-4 translate-y-1 rounded-full bg-sky-500" />
                          ) : (
                            <span className="flex h-4 w-4 translate-y-1 rounded-full bg-red-500" />
                          )
                        }
                      </CardContent>
                    </Card>
                  </div>
                ))
              }
            </>
          )
        }
      </div>
      <BottomNavBar />
    </>
  )
}

export default OrderPage