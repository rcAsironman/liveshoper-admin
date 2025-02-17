import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../lottie/Animation.json';

const LoadingAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie options={defaultOptions} height={50} width={50} />;
};

export default LoadingAnimation;
