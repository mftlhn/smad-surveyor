import React, { useCallback, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Camera } from 'react-camera-pro';
import Webcam from 'react-webcam';
import axios from 'axios';

const CameraInputAccessImage = ({ idOrder, token, isNew }) => {
    const camera = useRef(null);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // const uploadImage = async () => {
    //     setIsLoading(true);
    //     if (!image) {
    //         alert('Please take a photo first');
    //         return;
    //     }

    //     const blob = await fetch(image).then(res => res.blob());

    //     const formData = new FormData();
    //     formData.append('image', blob);
    //     formData.append('id_order', idOrder);
    //     formData.append('token', token);
    //     formData.append('image_type', 'access_image');

    //     try {
    //         const response = await fetch('/api/order/post-image', {
    //             method: 'POST',
    //             body: formData,
    //         })
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const result = await response.json();
    //         console.log('Response from server:', result);

    //         alert('Photo uploaded successfully!');
    //     } catch (error) {
    //         console.error('Error uploading photo:', error);
    //         alert('Failed to upload photo.');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    const dataURLtoBlob = (dataURL) => {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };

    const uploadImage2 = async () => {
        setIsLoading(true);
        if (!image) {
            alert('Please take a photo first');
            return;
        }

        // const blob = await fetch(image).then(res => res.blob());
        const formData = new FormData();
        formData.append('image', dataURLtoBlob(image));
        formData.append('id_order', idOrder);
        formData.append('token', token);
        formData.append('image_type', 'access_image');
        try {
            const response = await axios.post('/api/order/post-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(response.data);
        } catch (error) {
            console.log('Error uploading photo:', error);
        } finally {
            setIsLoading(false);
        }
        // console.log(image);
    }

    const capture = useCallback(() => {
        const imageSrc = camera.current.getScreenshot();
        setImage(imageSrc);
    }, [camera, setImage])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                {
                    isNew ? (
                    'Ambil poto akses'
                    ) : (
                    'Ambil lagi poto akses'
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
                                // <Camera ref={camera} className='w-[90%] h-[50px]' mirrored="false" aspectRatio={3 / 4} />
                                <Webcam
                                    audio={false}
                                    ref={camera}
                                    mirrored="false"
                                    screenshotFormat="image/jpeg"
                                    className='w-full h-full'
                                />
                            )
                        }
                    </div>
                    <div className='mt-3'>
                        {/* <Button  className='w-full' onClick={() => setImage(camera.current.takePhoto())}>Take photo</Button> */}
                        <Button  className='w-full' onClick={capture}>Take photo</Button>
                    </div>
                    {
                        image && (
                        <div className="mt-3">
                            <Button className='w-full' onClick={() => setImage(null)}>Retake photo</Button>
                        </div>
                        )
                    }
                </div>
                <div className="mt-5">
                    <form onSubmit={uploadImage2}>
                        <Button type="submit" className='w-full' disabled={isLoading}>
                            {isLoading ? 'Uploading...' : 'Upload Photo'}
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CameraInputAccessImage