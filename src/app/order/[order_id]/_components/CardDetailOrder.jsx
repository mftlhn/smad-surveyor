"use client";
import StoreClosed from '@/components/StoreClosed';
import StoreOpen from '@/components/StoreOpen';
import { Skeleton } from '@/components/ui/skeleton';
import UpdateIsOpen from '@/components/UpdateIsOpen';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const CardDetailOrder = ({ params }) => {
  const [orderId, setOrderId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const token = Cookies.get('smad-token');
  const token = localStorage.getItem('smad-token');
  
  // console.log(params);
  
  const fetchDetail = async (orderId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/order/detail/${orderId}`, {
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
      setDetail(data.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error('Fetch error:', err);
    }
  };

  // console.log(detail);
  

  useEffect(() => {
    if (!token) {
      router.push('/'); // Redirect jika token tidak ada
      return;
    }
    fetchDetail(params);
    // if (orderId) {
      // console.log(detail);
    // }
  }, [params]);
  
  if (isLoading) {
    return (
      <div className='flex flex-col space-y-3 mt-[17%]'>
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  } else {
    return (
      <>
        {
          detail?.is_open === null ? (
            <UpdateIsOpen orderId={orderId} />
          ) : detail?.is_open === true ? (
            // store open
            <StoreOpen is_interview={detail?.is_interview} />
          ) : (
            // store close
            <StoreClosed detail={detail} />
          )
        }
      </>
    );
  
  }
}

export default CardDetailOrder