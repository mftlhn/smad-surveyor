import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { FaInfoCircle } from 'react-icons/fa'
import { custom } from 'zod';
import { Separator } from './ui/separator';

const DetailCustomer = ({ customer }) => {
    // console.log(customer);
    
    return (
        <Dialog>
            <DialogTrigger>
                <FaInfoCircle />
            </DialogTrigger>
            <DialogContent className="w-[90%] h-1/2 overflow-y-scroll"
                onPointerDownOutside={(event) => event.currentTarget.contains(event.relatedTarget) || event.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>Detail Customer</DialogTitle>
                    <Separator className='' />
                </DialogHeader>
                <div className="flex flex-col py-4">
                    <div className="flex flex-row justify-between text-sm mb-2">
                        <div className='text-gray-500'>Nama Toko</div>
                        <div>
                            <p className='text-gray-800 font-semibold'>{customer?.store_name}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between text-sm mb-2">
                        <div className='text-gray-500'>Kode Toko</div>
                        <div>
                            <p className='text-gray-800 font-semibold'>{customer?.store_code}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between text-sm mb-2">
                        <div className='text-gray-500'>Alamat Toko</div>
                        <div>
                            <p className='text-gray-800 font-semibold'>{customer?.store_address}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between text-sm mb-2">
                        <div className='text-gray-500'>Nama Pemilik Toko</div>
                        <div>
                            <p className='text-gray-800 font-semibold'>{customer?.owner_name}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between text-sm mb-2">
                        <div className='text-gray-500'>Nomor Pemilik Toko</div>
                        <div>
                            <p className='text-gray-800 font-semibold'>{customer?.owner_phone_number}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between text-sm mb-2">
                        <div className='text-gray-500'>KTP Pemilik Toko</div>
                        <div>
                            <p className='text-gray-800 font-semibold'>{customer?.owner_ktp}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between text-sm mb-2">
                        <div className='text-gray-500'>Email Pemilik Toko</div>
                        <div>
                            <p className='text-gray-800 font-semibold'>{customer?.owner_email}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between text-sm mb-2">
                        <div className='text-gray-500 text-left'>Alamat Pemilik Toko</div>
                        <div>
                            <p className='text-gray-800 font-semibold text-right'>{customer?.owner_address}</p>
                        </div>
                    </div>
                </div>
                <DialogDescription></DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default DetailCustomer