import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar.jsx';
import PuppyCard from './components/PuppyCard.jsx';
//import MediaGrid from './components/MediaGrid.jsx';
import Gallery from "./pages/Gallery";
import Application from "./pages/Application";
import { animals } from './data';
import ParentCarousel from "./components/ParentCarousel";

  


const App = () => {
  const [puppies, setPuppies] = useState(animals);

  const [availablePuppies, setAvailablePuppies] = useState(0);
  useEffect(() => {
    const countAvailable = puppies.filter(
      (puppy) => puppy.availability === "AVAILABLE"
    ).length;
    setAvailablePuppies(countAvailable);
  }, []);

  const puppyGridRef = useRef(null);

  const allMedia = puppies.flatMap((puppy) => puppy.media || []);

  useEffect(() => {
    setPuppies(animals);
  }, []);

  const scrollToPuppies = () => {
    if (puppyGridRef.current) {
      puppyGridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  const parentMedia = [
    {
      type: "image",
      url: "public/assets/puppy/100.png",
      alt: "Bruce & Quinn",
    },
    {
      type: "image",
      url: "public/assets/puppy/50.png",
      alt: "Bruce - The Sire (Parent 1)",
    },
    {
      type: "image",
      url: "public/assets/puppy/40.png",
      alt: "Quinn - Enjoying the outdoors",
    },
    {
      type: "image",
      url: "public/assets/puppy/41.png",
      alt: "Quinn - Pregnant",
    },
    {
      type: "image",
      url: "public/assets/puppy/51.png",
      alt: "Bruce",
    },
    {
      type: "image",
      url: "public/assets/puppy/42.png",
      alt: "Quinn",
    },
    {
      type: "image",
      url: "public/assets/puppy/52.png",
      alt: "Bruce",
    },
    {
      type: "image",
      url: "public/assets/puppy/43.png",
      alt: "Quinn",
    },
    {
      type: "image",
      url: "public/assets/puppy/52.png",
      alt: "Bruce",
    },
    {
      type: "image",
      url: "public/assets/puppy/44.png",
      alt: "Quinn",
    },
  ];
  

  return (
    <>
      <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <div className='app-container'>
                <div className='hero-container'>
                  <h2>Find Your Hero. Take Home A Golden Sidekick Today!</h2>

                  {/*<MediaGrid media={allMedia} />*/}

                  <h3>Located in Costa Mesa,CA, our golden puppies are now old enough for their furever homes! </h3> 
                  
                  <h3>
                    We have{" "}
                    <span style={{ color: "#fff", fontWeight: "bold" }}>
                      {availablePuppies === 0 ? "NO" : availablePuppies}
                    </span>{" "}
                    of 10 available Batman pups looking for homes!
                  </h3>
                  <button className="hero-btn" onClick={scrollToPuppies}>
                  See Available Puppies
                  </button>
                </div>

                <div className="parents-carousel">
                  <ParentCarousel media={parentMedia} />
                </div>


                <div className="about-container">
                  <h2>About Gotham Goldens</h2>
                  <p>
                    Welcome to Gotham Goldens! We are a passionate breeders of high-quality
                    Golden Retrievers, specializing in raising healthy, happy, confident, and loving
                    pups. Our pups are raised in a loving home environment and socialized
                    early to ensure they develop into the perfect family companions.
                  </p>
                  <p>
                    Our beloved parent dogs, <strong>Bruce 'Wayne'</strong> and 
                    <strong> 'Harley' Quinn</strong>, come from healthy bloodlines, ensuring that
                    each pup inherits their gentle temperament and playful spirit.
                  </p>
                </div>


                <div ref={puppyGridRef} className='puppy-grid'>
                  {/* Map through puppies*/}
                  {puppies.map((puppy) => (
                    <PuppyCard key={puppy.name} puppy={puppy} />
                  ))}
                </div>
              </div>
            }
          />

          <Route path="/gallery" element={<Gallery media={allMedia} />} />
          <Route path="/apply" element={<Application />} />

        </Routes>
    </>
  );
};

export default App;
