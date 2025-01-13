import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { Camera } from 'react-camera-pro'
import { Button } from './ui/button';

const CameraInputFrontImage = ({ idOrder, token, isNew }) => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          {
            isNew ? (
              'Ambil poto depan'
            ) : (
              'Ambil lagi poto depan'
            )
          }
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] h-3/4 overflow-y-scroll">
        <DialogTitle>Camera</DialogTitle>
        <div className='flex flex-col'>
          <div className='flex justify-center'>
            {
              image ? (
                <img src={image} alt="Taken Photo" />
              ) : (
                <Camera ref={camera} className='w-[90%] h-[50px]' mirrored="false" aspectRatio={3 / 4}/>
              )
            }
          </div>
          <div className='mt-3'>
            <Button  className='w-full' onClick={() => setImage(camera.current.takePhoto())}>Take photo</Button>
          </div>
          {
            image && (
              <div className="mt-3">
                <Button className='w-full' onClick={() => setImage(null)}>Retake photo</Button>
              </div>
            )
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CameraInputFrontImage