"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Label } from './ui/label';
import { Button } from './ui/button';
import DetailCustomer from './DetailCustomer';
import Select from 'react-select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const StoreClosed = ({ detail, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isMoved, setIsMoved] = useState(false);
  // console.log(detail?.id);
  
  const { 
      register,
      handleSubmit,
      watch,
      setValue
  } = useForm({
      defaultValues: {
        order_id: detail?.id,
        token: token,
        how_long_closed: "",
        is_changed: null,
        new_phone_number: "",
        is_moved: null,
        new_store_name: "",
        new_store_address: "",
        relative_name: "",
        relative_phone_number: "",
        owner_address: ""
      }
  });

  const handleIsChangedToTrue = () => {
      setIsChanged(true);
  };
  const handleIsChangedToFalse = () => {
      setIsChanged(false);
  };
  const handleIsMovedToTrue = () => {
      setIsMoved(true);
  };
  const handleIsMovedToFalse = () => {
      setIsMoved(false);
  };
  const selectOptions = [
    { value: '< 6 Bulan', label: '< 6 Bulan' },
    { value: '6 Bulan - 1 Tahun', label: '6 Bulan - 1 Tahun' },
    { value: '> 1 Tahun', label: '> 1 Tahun' },
  ];
  

  const formSubmit = async (data) => {
    // console.log(data)
    setIsLoading(true);
    const response = await fetch(`/api/order/update-shop-closed`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    setIsLoading(false);
    // console.log(response.body);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      window.location.reload();
    }
  }

  return (
    <div className="flex flex-col space-y-3 h-full px-2 mt-3 z-0 relative">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="grid grid-rows-1 gap-3 mb-[45%]">
          <div className='mb-10'>
            <Card className="border-red-600 bg-red-400">
              <CardHeader>
                <CardTitle className="text-white">Perhatikan</CardTitle>
                <CardDescription>
                  <p className="text-gray-200 text-sm text-justify">
                    Pastikan melakukan konfirmasi kepada lingkungan sekitar seperti ketua RT, tetangga sekitar, kepala pasar, tukang parkir atau pihak-pihak lain yang bisa memberikan informasi mengenai hal-hal tersebut.	
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div>
            <Label>Sudah berapa lama toko tukup?<span className='text-red-600'>*</span></Label>
            <Select
              options={selectOptions}
              onChange={(option) => setValue('how_long_closed', option?.value)} // Update form value
              isClearable
              required
              className='z-10 mt-2'
            />
          </div>
          <div>
            <Label>Apakah data customer berubah?<span className='text-red-600'>*</span></Label>
            <RadioGroup
              className="flex flex-row items-center space-x-4 mt-2"
              onValueChange={(value) => {
                setValue('is_changed', value === 'true')
                // console.log(value === 'true')
              }}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" onClick={handleIsChangedToTrue} />
                <Label htmlFor="option-one">Ya</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" onClick={handleIsChangedToFalse} />
                <Label htmlFor="option-two">Tidak</Label>
              </div>
            </RadioGroup>
          </div>
          {
            isChanged && (
              <div
                className='animate-fade-in'
              >
                <div className='mt-5'>
                  <p className='text-center text-gray-500'>Masukkan data customer baru</p>
                  <Separator />
                </div>
                <div>
                  <Label>No. Telepon Baru</Label>
                  <Input
                    type="text"
                    onChange={(e) => setValue('new_phone_number', e.target.value)}
                    className='mt-2' 
                  />
                </div>
                <div>
                  <Separator />
                </div>
              </div>
            )
          }
          <div>
            <Label>Apakah toko customer pindah?<span className='text-red-600'>*</span></Label>
            <RadioGroup
              className="flex flex-row items-center space-x-4 mt-2"
              onValueChange={(value) => {
                setValue('is_moved', value === 'true')
              }}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" onClick={handleIsMovedToTrue} />
                <Label htmlFor="option-one">Ya</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" onClick={handleIsMovedToFalse} />
                <Label htmlFor="option-two">Tidak</Label>
              </div>
            </RadioGroup>
          </div>
          {
            isMoved && (
              <div className='animate-fade-in'>
                <div className='mt-5'>
                  <p className='text-center text-gray-500'>Masukkan data toko customer baru</p>
                  <Separator />
                </div>
                <div>
                  <Label>Nama toko baru</Label>
                  <Input
                    type="text"
                    onChange={(e) => setValue('new_store_name', e.target.value)}
                    className='mt-2' 
                  />
                </div>
                <div>
                  <Label>Alamat toko baru</Label>
                  <Input
                    type="text"
                    onChange={(e) => setValue('new_store_address', e.target.value)}
                    className='mt-2' 
                  />
                </div>
                <div>
                  <Separator />
                </div>
              </div>
            )
          }
          <div>
            <Label>Nama kerabat customer<span className='text-red-600'>*</span></Label>
            <Input
              type="text"
              onChange={(e) => setValue('relative_name', e.target.value)}
              className='mt-2'
              required
            />
          </div>
          <div>
            <Label>No. Telepon kerabat customer<span className='text-red-600'>*</span></Label>
            <Input
              type="text"
              onChange={(e) => setValue('relative_phone_number', e.target.value)}
              className='mt-2'
              required
            />
          </div>
          <div>
            <Label>Alamat customer<span className='text-red-600'>*</span></Label>
            <Input
              type="text"
              onChange={(e) => setValue('owner_address', e.target.value)}
              className='mt-2'
              required
            />
          </div>
        </div>
        <Card className="px-2 -ml-4 fixed bottom-5 w-full mt-2">
          <Button type="submit" disabled={isLoading} className="mb-[16%] mt-5 w-full">
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </Card>
      </form>
    </div>
  )
}

export default StoreClosed