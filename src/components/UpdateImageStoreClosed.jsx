import React, { useRef, useState } from 'react'
import { Camera } from 'react-camera-pro'
import { Button } from './ui/button';
import CameraInputFrontImage from './CameraInputFrontImage';
import CameraInputAccessImage from './CameraInputAccessImage';

const UpdateImageStoreClosed = ({ detailOrder, token }) => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  // console.log(detailOrder);
  
  

  return (
    <div className="flex flex-col space-y-3 h-full px-2 mt-3 z-0 relative">
        <div>
            {/* <h1 className="text-xl font-semibold">Update Image Store Closed</h1> */}
            <p className="text-base text-gray-500">Upload gambar toko yang tutup</p>
        </div>
        <div className='mt-3 grid grid-cols-2 gap-3'>
          <div>
            {
              detailOrder?.image?.front_image ? (
                <div>
                  <img src={detailOrder?.image?.front_image} alt="Front image photo" className="border border-gray-300 shadow-md rounded-md mb-2" />
                  <CameraInputFrontImage idOrder={detailOrder?.id} token={token} isNew={false} />
                </div>
              ) : (
                <CameraInputFrontImage idOrder={detailOrder?.id} token={token} isNew={true} />
              ) 
            }
          </div>
          <div>
            {
              detailOrder?.image?.access_image ? (
                <img src={detailOrder?.image?.access_image} alt="Front image photo" />
              ) : (
                <CameraInputAccessImage idOrder={detailOrder?.id} token={token} isNew={true} />
              ) 
            }
          </div>
          <div>
            {
              detailOrder?.image?.around_image_1 ? (
                <img src={detailOrder?.image?.around_image_1} alt="Front image photo" />
              ) : (
                <CameraInputFrontImage idOrder={detailOrder?.id} token={token} isNew={true} />
              ) 
            }
          </div>
          <div>
            {
              detailOrder?.image?.around_image_2 ? (
                <img src={detailOrder?.image?.around_image_2} alt="Front image photo" />
              ) : (
                <CameraInputFrontImage idOrder={detailOrder?.id} token={token} isNew={true} />
              ) 
            }
          </div>
        </div>
    </div>
  )
}

export default UpdateImageStoreClosed