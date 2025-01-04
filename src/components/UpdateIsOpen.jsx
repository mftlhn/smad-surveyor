import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Card } from './ui/card';

const UpdateIsOpen = ({ orderId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [token, setToken] = useState(null);
    const { 
        register,
        handleSubmit,
        watch,
        setValue
    } = useForm({
        defaultValues: {
            is_open: null
        }
    });

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
        
    }, [orderId]);

    const formSubmit = async (data) => {   
        setIsLoading(true);
        // console.log(data);
        // setIsLoading(false);
        
        const response = await fetch(`/api/order/update-is-open/${orderId}/${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        setIsLoading(false);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            // alert('Data berhasil disimpan');
            // router.push(`/order/${orderId}`);
            window.location.reload();
        }
    }
  return (
    <form onSubmit={handleSubmit(formSubmit)} className='mt-[17%] mx-2'>
        <div className='flex flex-col'>
            <div>
              <div>Apakah toko buka?</div>  
            </div>
            <div className='mt-2'>
                <RadioGroup
                    onValueChange={(selected) => {
                        setValue('is_open', selected === 'true');
                        // console.log('Selected value:', selected === 'true');
                    }}
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="option-one" />
                        <Label htmlFor="option-one">Buka</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="option-two" />
                        <Label htmlFor="option-two">Tutup</Label>
                    </div>
                </RadioGroup>
            </div>
            {/* <div className='flex justify-end mt-3'>
                <Button variant="secondary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Simpan'}
                </Button>
            </div> */}
            <Card className="px-2 -ml-2 fixed bottom-5 w-full mt-2">
                <Button type="submit" disabled={isLoading} className="mb-[16%] mt-5 w-full">
                {isLoading ? 'Loading...' : 'Submit'}
                </Button>
            </Card>
        </div>
    </form>
  )
}

export default UpdateIsOpen