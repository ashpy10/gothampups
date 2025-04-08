import React, { useEffect, useState } from "react";
import { calculateAge } from "../utils/calculateAge";
import MediaCarousel from "./MediaCarousel";
import { Link } from "react-router-dom";

const PuppyCard = ({ puppy }) => {
  const age = calculateAge(puppy.dob);
  const [breedInfo, setBreedInfo] = useState(null);

  useEffect(() => {
    const fetchBreedData = async () => {
      try {
        const breed = puppy.appearance?.find(item => item.title === "Breed")?.description;
        if (!breed) return;

        const formattedBreed = encodeURIComponent(breed.toLowerCase());

        const res = await fetch(`https://api.api-ninjas.com/v1/dogs?name=${formattedBreed}`, {
          headers: {
            "X-Api-Key": import.meta.env.VITE_API_NINJAS_KEY,
          },
        });

        const data = await res.json();
        if (data.length > 0) {
          setBreedInfo(data[0]);
        }
      } catch (error) {
        console.error("Error fetching breed info:", error);
      }
    };

    fetchBreedData();
  }, [puppy]);

  const renderSection = (sectionTitle, data) => (
    <div className="section">
      <h3>{sectionTitle}</h3>
      {data.map((item, index) => (
        <div key={index} className="section-item">
          <img src={item.icon} alt={item.title} className="icon" />
          <strong>{item.title}</strong>
          <p className="description">{item.description}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className='puppy_card'>
      <h2>{puppy.name}</h2>

      {puppy.media?.length > 0 && <MediaCarousel media={puppy.media} />}

      <p><strong>Description: </strong>{puppy.description}</p>
      <p><strong>Gender: </strong>{puppy.gender}</p>
      <p><strong>Age: </strong>{age}</p>

      {renderSection("Health", puppy.health)}
      {renderSection("Appearance", puppy.appearance)}
      {renderSection("Socialization & Enrichment", puppy.socialization)}

      {/* Breed info from API */}
      {breedInfo && (
        <div className="breedInfo">
          <h3>Breed Details</h3>
          <p><strong>Shedding Rating:</strong> {breedInfo.shedding}</p>
          <p><strong>Grooming Rating:</strong> {breedInfo.grooming}</p>
          <p><strong>Trainability Rating:</strong> {breedInfo.trainability}</p>
          <p><strong>Playfulness Rating:</strong> {breedInfo.playfullness}</p>
          <p><strong>Barking Rating:</strong> {breedInfo.barking}</p>
        </div>
      )}

      <p><strong>Cost: </strong>{puppy.fee}</p>
      <p><strong>Availability: </strong>{puppy.availability}</p>

      {puppy.availability === "AVAILABLE" && (
        <div className="button-container">
          <Link to={`/apply?puppy=${puppy.name}`} className="apply-button">
            Apply Now!
          </Link>
        </div>
      )}
    </div>
  );
};

export default PuppyCard;
