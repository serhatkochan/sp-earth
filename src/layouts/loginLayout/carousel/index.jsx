import React from 'react';
import carouselData from './carouselData';
import CarouselComponent from 'components/carousel';

import './index.scss';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'linear',
  };

  return (
    <div>
      <CarouselComponent settings={settings} carouselData={carouselData} />
    </div>
  );
};

export default Carousel;
