import React from "react";

const MediaGrid = ({ media }) => {
    return (
        <div className="media-grid">
            {media.map((item, index) => (
                <div key={index} className="media-item">
                    {item.type === "image" ? (
                        <img src={item.url} alt={`Puppy media ${index + 1}`} />
                    ) : (
                        <video controls>
                            <source src={item.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )
                    }
                </div>
            ))}
        </div>
    );
};

export default MediaGrid;