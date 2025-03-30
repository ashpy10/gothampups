import React, { useState } from "react";
import "./Application.css"; // Add CSS for styling if needed
import { useLocation } from "react-router-dom";


const Application = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        tel: "",
        location: "",
        puppy_option: [],
        why: "",
        experience: "",
        pets: "",
        questions: "",
    });
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [success, setSuccess] = useState(false);


    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
      
        // Add or remove puppy from selection
        if (checked) {
          setFormData({
            ...formData,
            puppy_option: [...formData.puppy_option, value]
          });
        } else {
          setFormData({
            ...formData,
            puppy_option: formData.puppy_option.filter(
              (puppy) => puppy !== value
            )
          });
        }
      };

    const handleSelectChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData({
            ...formData,
            puppy_option: selectedOptions
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://gothampups-production.up.railway.app/api/applications", // 🚀 Update with live URL
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                setSuccess(true);        
                setFormData({
                    name: "",
                    email: "",
                    tel: "",
                    location: "",
                    puppy_option: [],
                    why: "",
                    experience: "",
                    pets: "",
                  });
            } else {
                console.error("Error submitting application.");
            }
        } catch (error) {
            console.error("Error:", error);
        }

        setTimeout(() => {
            setSuccess(false);
          }, 500000);

    };

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const puppyName = queryParams.get("puppy");

    return (
        <div className="application-wrapper">
            <div className="application-container">
                <h1>Fur-ever Home Application</h1>

                {success && (
                    <div className="success-message">
                    🎉 Thank you! Your application was successfully submitted. We’ll contact you soon!
                    </div>
                )}

                <h3>Thank you for your interest in our furry babies. We are looking for the best possible home for each puppy and for fur-parents that will love each pup as much as we do.</h3>

                <p>Please fill out the application below.  We'll reach out with possible date/times & mutual locations for you to meet the pups.</p>
                <p>For more puppy updates, please follow our Instagram accounts!</p>
                <p className="instagram">
                    <a
                        href="https://www.instagram.com/gothamgoldens/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Gotham Goldens Instagram
                    </a>
                    </p>

                    <p>
                    <a
                        href="https://www.instagram.com/ashleypyka/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ashley Pyka Instagram
                    </a>
                </p>

                <form onSubmit={handleSubmit} className="application-form">
                    <label htmlFor="name">Your Full Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                    <label htmlFor="email">Email Address:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label htmlFor="tel">Phone Number:</label>
                    <input type="tel" id="tel" name="tel" value={formData.tel} onChange={handleChange} required />

                    <label htmlFor="location">Where Are You Located?</label>
                    <input type="text" id="location" name="location"value={formData.location} onChange={handleChange} required />

                    <label htmlFor="puppy_option">Which Puppy or Puppies Are You Interested In Meeting?</label>
                    {puppyName && <p>Make sure to check the correct box, you were interested in: {puppyName}</p>}
                    <div className="checkbox-group">
                        {[
                            "Alfred",
                            "Bane",
                            "Heath The Joker",
                            "Helena The Huntress",
                            "Posion Ivy",
                            "Edward The Riddler",
                            "Oswald The Penguin",
                            "Gordon"
                        ].map((puppy, index) => (
                            <div key={index} className="checkbox-item">
                            <input
                            type="checkbox"
                            id={puppy}
                            name="puppy_option"
                            value={puppy}
                            checked={formData.puppy_option.includes(puppy)}
                            onChange={handleCheckboxChange}
                            />
                            <label htmlFor={puppy}>{puppy}</label>
                        </div>
                        ))}
                    </div>

                    <label htmlFor="why">Why do you want a puppy?</label>
                    <textarea id="why" name="why" rows="8" value={formData.why} onChange={handleChange}></textarea>

                    <label htmlFor="experience">Have you had a puppy before? Have you had a Golden Retreiver or another active breed?</label>
                    <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange}/>

                    <label htmlFor="pets">Does your household have other pets or children?</label>
                    <input type="text" id="pets" name="pets" value={formData.pets} onChange={handleChange} />

                    <label htmlFor="questions">Do you have any questions for us?</label>
                    <textarea id="questions" name="questions" rows="8" value={formData.questions} onChange={handleChange}></textarea>

                    <button type="submit">Submit Application!</button>
                </form>
            </div>
        </div>
    );
};

export default Application;
