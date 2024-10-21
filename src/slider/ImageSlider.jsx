import React, { useState } from 'react';
import './ImageSlider.css';
import Img1 from "../assets/Image1.jpg";
import Img2 from "../assets/image5.jpg";
import Img3 from "../assets/image3.jpg";
import Img4 from "../assets/image4.jpg";
import Img5 from "../assets/image5.jpg";
import Img6 from "../assets/image6.jpg";
import Img7 from "../assets/image7.avif"

const images = [Img1, Img2, Img3, Img4, Img5,Img6,Img7];

const ImageSlider = () => {
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
    <div className="slider-container">
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="slider-image"
          />
        ))}
      </div>
      <button className="slider-button left" onClick={prevImage}>❮</button>
      <button className="slider-button right" onClick={nextImage}>❯</button>
      <div className="dots-container">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToImage(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
