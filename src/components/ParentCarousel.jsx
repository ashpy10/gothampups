// src/components/ParentCarousel.jsx
import React, { useState } from "react";
import "./ParentCarousel.css"; // Import the CSS styles

const ParentCarousel = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Go to next media
  const nextMedia = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  // Go to previous media
  const prevMedia = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex === 0 ? media.length - 1 : prevIndex - 1)
    );
  };

  return (
    <div className="parent-carousel-container">
      <div className="parent-carousel">
        <h2>Meet Bruce & Quinn!</h2>
        {media[currentIndex].type === "image" ? (
          <img
            src={media[currentIndex].url}
            alt={media[currentIndex].alt}
            className="parent-carousel-image"
          />
        ) : (
          <video controls className="parent-carousel-video">
            <source src={media[currentIndex].url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Previous and Next Buttons */}
      <button className="prev-btn" onClick={prevMedia}>
        ❮
      </button>
      <button className="next-btn" onClick={nextMedia}>
        ❯
      </button>
    </div>
  );
};

export default ParentCarousel;
