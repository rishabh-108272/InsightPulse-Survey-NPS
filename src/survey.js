import React, { useState } from 'react';
import axios from 'axios';
import './survey.css';

const Survey = () => {
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [improvements, setImprovements] = useState('');
  const [uiRating, setUiRating] = useState(null);
  const [formData, setFormData] = useState({
    rating: null,
    feedback: '',
    improvements: '',
    uiRating: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
    setFormData((prevData) => ({
      ...prevData,
      rating: parseInt(event.target.value, 10),
    }));
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      feedback: event.target.value,
    }));
  };

  const handleImprovementsChange = (event) => {
    setImprovements(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      improvements: event.target.value,
    }));
  };

  const handleUiRatingChange = (event) => {
    setUiRating(parseInt(event.target.value, 10));
    setFormData((prevData) => ({
      ...prevData,
      uiRating: parseInt(event.target.value, 10),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      console.log('API Key:', process.env.REACT_APP_KEY); 
  
      const response = await axios.post(
        process.env.REACT_APP_KEY,
        { sheet1: { ...formData } },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log(response);
      setSuccessMessage('Submission successful!');
    } catch (error) {
      console.error(error);
      setError('Error submitting survey');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="survey-container">
    <button>Dashboard</button>
      <h2>Comprehensive User Feedback Survey</h2>

      <form onSubmit={handleSubmit}>
        <p>1. How likely are you to recommend our service to a friend or colleague?</p>
        <div className="rating-options">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="rating"
                required
                value={option}
                onChange={handleRatingChange}
              />
              {option}
            </label>
          ))}
        </div>

        <p>2. What features do you like the most about our service? (Optional)</p>
        <textarea
          rows="4"
          name="feedback"
          style={{ width: '100%', fontSize: '16px' }}
          placeholder="Type your feedback here..."
          value={feedback}
          onChange={handleFeedbackChange}
        ></textarea>

        <p>3. How can we improve our service to better meet your needs?</p>
        <textarea
          rows="4"
          name="improvements"
          required
          style={{ width: '100%', fontSize: '16px' }}
          placeholder="Your suggestions for improvement..."
          value={improvements}
          onChange={handleImprovementsChange}
        ></textarea>

        <p>4. On a scale of 1 to 5, how satisfied are you with the user interface and design?</p>
        <div className="rating-options">
          {[1, 2, 3, 4, 5].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="uiRating"
                required
                value={option}
                onChange={handleUiRatingChange}
              />
              {option}
            </label>
          ))}
        </div>

        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Survey;
