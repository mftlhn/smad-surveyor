"use client";
import DetailCustomer from '@/components/DetailCustomer';
import StoreClosed from '@/components/StoreClosed';
import StoreOpen from '@/components/StoreOpen';
import { Skeleton } from '@/components/ui/skeleton';
import UpdateIsOpen from '@/components/UpdateIsOpen';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import loadingDocument from '@/components/loading-document.json';
import Lottie from 'lottie-react';
import UpdateImageStoreClosed from '@/components/UpdateImageStoreClosed';

const CardDetailOrder = ({ params }) => {
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

      const fetchDetail = async () => {
        try {
          const response = await fetch(`/api/order/detail/${params}/${token}`);
          if (!response.ok) throw new Error(`Error: ${response.status}`);
          const data = await response.json();
          setDetail(data.data);
        } catch (err) {
          console.error("Fetch error:", err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchDetail(params, token);
  }, [token, router, params]);
  
  if (isLoading) {
    return (
      <div className='flex flex-col min-h-screen items-center justify-center mt-[17%] mx-2'>
        {/* <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div> */}
        <Lottie animationData={loadingDocument} className="h-[150px] w-full" />
      </div>
    );
  } else {
    return (
      <div className='mt-[17%] mx-2'>
        <div className="flex justify-end">
          <DetailCustomer customer={detail?.customer} />
        </div>
        {
          detail?.is_open === null ? (
            <UpdateIsOpen orderId={params} />
          ) : detail?.is_open === true ? (
            // store open
            <StoreOpen is_interview={detail?.is_interview} />
          ) : (
            // store close
            detail?.how_long_closed !== null ? (
              <UpdateImageStoreClosed detailOrder={detail} token={token} />
            ) : (
              <StoreClosed detail={detail} token={token} />
            )
          )
        }
      </div>
    );
  
  }
}

export default CardDetailOrder