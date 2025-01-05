"use client"
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import BottomNavBar from '@/components/BottomNavBar'
import { useRouter } from 'next/navigation'
import loadingProfile from '@/components/loading-profile-2.json';
import { Skeleton } from '@/components/ui/skeleton'
import LogoutDialog from '@/components/LogoutDialog'
import Lottie from 'react-lottie-player'

const ProfilePage = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});

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

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/profile/${token}`, {
          method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setProfile(data.data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, router]);

  return (
    <>
      <Header title={'Profile'}/>
      <div className="flex flex-col space-y-3 h-full mt-3 z-0 relative">
        <div className="w-full h-[160px] bg-gray-700 flex flex-row">
          <div className='flex flex-row mt-[70px] mx-2'>
            <div className="h-[70px] w-[70px] rounded-full bg-gray-500 flex items-center justify-center">
              {
                isLoading ? (
                  <Lottie loop play animationData={loadingProfile} className="" />
                ) : (
                  <p className="text-4xl text-white font-bold">
                    {profile && profile?.name ? profile?.name[0].toUpperCase() : ''}
                  </p>
                )
              }
            </div>
            <div className='flex flex-col ml-3'>
              {
                isLoading ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  <div>
                    <p className='text-lg font-bold text-white'>{profile && profile?.name ? profile?.name : ''}</p>
                    <p className='text-sm text-white'>{profile && profile?.email ? profile?.email : ''}</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        {/* <Button className="mx-2">LOGOUT</Button> */}
        <LogoutDialog token={token} />
      </div>
      <BottomNavBar />
    </>
  )
}

export default ProfilePage