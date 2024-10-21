import React, { useState } from 'react';
import './ImageSlider2.css';
import Img1 from "../images/img.jpg";
import Img2 from "../images/img2.jpg";
import Img3 from "../images/img3.jpg";
import Img4 from "../images/img4.jpg";
import Img5 from "../images/img5.jpg";
import Img6 from "../images/img2.jpg";


const images = [Img1, Img2, Img3, Img4, Img5,Img6];

const ImageSlider2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container1">
      <div
        className="slider-wrapper1"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="slider-image1"
          />
        ))}
      </div>
      <button className="slider-button1 left" onClick={prevImage}>❮</button>
      <button className="slider-button1 right" onClick={nextImage}>❯</button>
      <div className="dots-container1">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot1 ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToImage(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider2;
