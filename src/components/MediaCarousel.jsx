import React, { useState } from "react"; 

const MediaCarousel = ({ media }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!media || media.length === 0){
        return <p className="media-placeholder">No media available</p>;
    }

    const nextMedia = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    };

    const prevMedia = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? media.length - 1 : prevIndex - 1
        );
    };
    
    return (
        <div className="media-carousel">
            {media[currentIndex].type === "image" ? (
                <img
                    src={media[currentIndex].url}
                    alt="Puppy media"
                    className="media-item"
                    />
            ) : (
                <video controls className="media-item">
                    <source src={media[currentIndex].url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )
            }
                <button className="prev-btn" onClick={prevMedia}>
                    ❮
                </button>
                <button className="next-btn" onClick={nextMedia}>
                    ❯
                </button>
       </div>
    );
};

export default MediaCarousel;