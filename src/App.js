import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [textInput, setTextInput] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [displayedSummary, setDisplayedSummary] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSummarizeClick = () => {
    setLoading(true); // Set loading to true when requesting summarization
    fetch('https://llama2-endpoint.onrender.com/app/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: textInput })
    })
    .then(response => {
      setLoading(false); // Set loading to false when response is received
      if (!response.ok) {
        throw new Error('Error summarizing text');
      }
      return response.json();
    })
    .then(data => {
      setSummary(data.summary);
      setError('');
      setDisplayedSummary('');
      displaySummaryWithTypewriter(data.summary);
    })
    .catch(error => {
      setLoading(false); // Set loading to false if there's an error
      setError('Error summarizing text. Please try again.');
    });
  };

  const displaySummaryWithTypewriter = (summary) => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedSummary(summary.substring(0, index));
      index++;
      if (index > summary.length) {
        clearInterval(interval);
      }
    }, 3); // Adjust typing speed as needed
  };

  useEffect(() => {
    if (summary) {
      displaySummaryWithTypewriter(summary);
    }
  }, [summary]);

  return (
    <div className="container"> 
      <h4>Smart Summarization</h4>
      <div className="content-container">
        <div className="input-container">
          <div className="textarea-container">
            <textarea
              className="textarea"
              placeholder="Enter text to summarize..."
              value={textInput}
              onChange={handleTextInputChange}
              rows={10}
              cols={50}
            />
          </div>

          <div className="button-container">
            <button className="button" onClick={handleSummarizeClick} disabled={!textInput.trim().length}>
              Summarize
            </button>
          </div>
        </div>

        <div className="output-container">
          {loading && <div className="loader">Loading...</div>} {/* Loader */}
          {error && !loading && <div className="error">{error}</div>} {/* Show error only if not loading */}
          {displayedSummary && !loading && (
            <div className="response-box">
              <h4>Summary:</h4>
              <div className="summary-text">
                {displayedSummary.split('\n').map((sentence, index) => (
                  <p key={index}>{sentence}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
