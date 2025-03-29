import React from "react";
import { calculateAge } from "../utils/calculateAge";
import MediaCarousel from "./MediaCarousel";
import { animals } from "../data";
import { Link } from "react-router-dom";



const PuppyCard = ({ puppy }) => {
  const age = calculateAge(puppy.dob);

  const renderSection = (sectionTitle, data) => (
    <div className="section">
      <h3>{sectionTitle}</h3>
      {data.map((item, index) => (
        <div key={index} className="section-item">
          {/* Render the local image icon */}
          <img
            src={item.icon} // Path to the image
            alt={item.title}
            className="icon"
          />
          <strong>{item.title}</strong><p className="description">{item.description}</p>
          <div>
          </div>
        </div>
      ))}
    </div>
  );
  

  return (
    <div className='puppy_card'>
      <h2>{puppy.name}</h2>

      {puppy.media && puppy.media.length > 0 && (
        <MediaCarousel media={puppy.media} />
      )}
      <p><strong>Description: </strong>{puppy.description}</p>
      <p><strong>Gender: </strong>{puppy.gender}</p>
      <p><strong>Age: </strong>{age}</p>

      {renderSection("Health", puppy.health)}
      {renderSection("Appearance", puppy.appearance)}
      {renderSection("Socialization & Enrichment", puppy.socialization)}

      <p><strong>Cost: </strong>{puppy.fee}</p>
      <p><strong>Availability: </strong>{puppy.availability}</p>


      {/* Conditionally render the Apply Now button */}
      {puppy.availability === "AVAILABLE" && (
        <div className="button-container">
        <Link
          to={`/apply?puppy=${puppy.name}`}
          className="apply-button"
        >
        Apply Now!
        </Link>
        </div>      
    )}

    </div>
  );
};

export default PuppyCard;
