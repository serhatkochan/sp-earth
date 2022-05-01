import { Image } from 'antd';
import './index.scss';

const CarouselImage = (props) => {
  return (
    <div className={props.className}>
      <div className="carousel-item">
        <Image preview={false} src={props.imageUrl} />
        <div className="carousel-text">
          <div className="carousel-text-number ">
            <div className="carousel-divider"></div>
            <span>{props.texts.textNumber}</span>
          </div>
          <div className="carousel-text-title">{props.texts.textTitle} </div>
          <div className="carousel-title-divider"></div>
          <div className="carousel-text-description">
            {props.texts.textDescription}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselImage;
