import React from 'react'
import animationData from '../../assests/77620-404-website-error-animation.json';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col max-w-full mx-auto items-center'>
            <Lottie animationData={animationData} className='w-[45%]'/>
            <button
                className='p-3 w-52 text-xl text-white bg-[#ff6700] hover:scale-110 hover:opacity-80 rounded-lg transition ease-in-out delay-150'
                onClick={() => {
                    navigate('/')
                }}
            >Back to Home</button>
        </div>
    )
}
export default NotFound;