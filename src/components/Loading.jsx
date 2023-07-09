import React from 'react'
import animationData from '../assests/97930-loading.json';
import Lottie from 'lottie-react';

const Loading = () => {
  return (
    <div className='w-64 center'>
        <Lottie animationData={animationData} />
    </div>
  )
}

export default Loading