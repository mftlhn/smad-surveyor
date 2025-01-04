"use client";
import StoreClosed from '@/components/StoreClosed';
import StoreOpen from '@/components/StoreOpen';
import { Skeleton } from '@/components/ui/skeleton';
import UpdateIsOpen from '@/components/UpdateIsOpen';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const CardDetailOrder = ({ params }) => {
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [token, setToken] = useState(null);
  
  // console.log(params);

  // useEffect(() => {
  //   if (!token) {
  //     router.push('/'); // Redirect jika token tidak ada
  //     return;
  //   }
  //   fetchDetail(params);
  // }, [params]);

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
        // try {
        //   setIsLoading(true);
        //   const response = await fetch(`/api/order/detail/${params}/${token}`, {
        //   method: 'GET',
        //     headers: {
        //           'Content-Type': 'application/json',
        //       },
        //   });
    
        //   if (!response.ok) {
        //     setIsLoading(false);
        //     throw new Error(`HTTP error! status: ${response.body}`);
        //   }
    
        //   const data = await response.json();
        //   setDetail(data.data);
        //   setIsLoading(false);
        // } catch (err) {
        //   setIsLoading(false);
        //   console.error('Fetch error:', err);
        // }
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
      <div className='flex flex-col space-y-3 mt-[17%] mx-2'>
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
            <UpdateIsOpen orderId={params} />
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