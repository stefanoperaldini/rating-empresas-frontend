import React from 'react';
import Lottie from 'react-lottie';
import dotsYellowData from './loading-dots.json';

function DotsYellow() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: dotsYellowData
    };

    return <Lottie options={defaultOptions} height={50} width={50} />;
}

DotsYellow.displayName = 'YellowDots';

export { DotsYellow };