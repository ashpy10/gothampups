import React from "react";
import "./Gallery.css";

const Gallery = ({ media }) => {
    return (
      <div className="gallery-container">
        <h1>Gallery of Gotham Goldens</h1>
        <div className="gallery-grid">
          {media.map((item, index) => (
            <div key={index} className="gallery-item">
              {item.type === "image" ? (
                <img src={item.url} alt={`Gallery item ${index + 1}`} />
              ) : (
                <video controls>
                  <source src={item.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Gallery;