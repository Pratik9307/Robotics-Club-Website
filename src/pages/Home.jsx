import React, { useEffect } from 'react';
import ImageSlider from '../slider/ImageSlider';
import './Home.css';
import HODSir from "../assets/HODSir.jpg";
import Footer from "../components/Footer";
import SimpleDiv from './SimpleDiv';

const Home = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <div className='Wrapper'>
      <div className='Div-Wrapper'>
        <div className='Div1 fade-in-up'>
          Welcome to Sanjivani Group of Institutes
        </div>
        <ImageSlider />
      </div>

      <div className='Title2 '>
        <p>Welcome to Mechatronics Engineering</p>
      </div>

      <div className='Data-Container fade-in-up'>
        <div className='img-c'>
          <img className='img1' src={HODSir} alt="HOD" />
        </div>
        <div className='Data-container1'>
          <p>Dr. Rajendrakumar Kapgate</p>
          <p>Head of the Department, Mechatronics Engineering</p>
          <p>Sanjivani College of Engineering, Kopargaon</p>
        </div>
      </div>

      <div className='containt-folder'>
        <div className='DV'>
          <b>Vision</b>
          <p>
            Our vision is to develop mechatronics engineering professionals to
            cater to real-time challenges of the globe through competency-based
            Mechatronics Engineering Education.
          </p>
        </div>
        <div className='DM'>
          <b>Mission</b>
          <p>
            To offer competency-based mechatronics engineering education and
            prepare learners to become innovators, entrepreneurs, and
            technocrats. To contribute to research and discovery in real-time
            challenges of mechatronics engineering arenas. To train learners in
            life skills, professional skills, citizen values, and ethics to
            upgrade their quality of life and professional careers.
          </p>
        </div>
      </div>

      <SimpleDiv/>

      <Footer />
    </div>
  );
}

export default Home;
