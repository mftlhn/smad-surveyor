import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const UpdateIsOpen = ({ orderId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
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

    const formSubmit = async (data) => {   
        setIsLoading(true);     
        const response = await fetch(`/api/order/update-is-open/${orderId}`, {
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
            window.location.reload();
            // router.push(`/order/${orderId}`);
        }
    }
  return (
    <form onSubmit={handleSubmit(formSubmit)}>
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
            <div className='flex justify-end mt-3'>
                <Button variant="secondary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Simpan'}
                </Button>
            </div>
        </div>
    </form>
  )
}

export default UpdateIsOpen