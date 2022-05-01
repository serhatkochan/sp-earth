import CarouselSlick from 'react-slick';
import CarouselImage from './carouselImage';

const Carousel = ({ settings, carouselData }) => {
  return (
    <div>
      <CarouselSlick {...settings}>
        {carouselData.map((image) => (
          <CarouselImage
            key={image.imageUrl}
            texts={image.texts}
            styles={image.styles}
            imageUrl={image.imageUrl}
            className={image.className}
          />
        ))}
      </CarouselSlick>
    </div>
  );
};

export default Carousel;
