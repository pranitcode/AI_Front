import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [textInput, setTextInput] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSummarizeClick = () => {
    fetch('/app/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: textInput })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error summarizing text');
      }
      return response.json();
    })
    .then(data => {
      setSummary(data.summary);
      setError('');
    })
    .catch(error => {
      setError('Error summarizing text. Please try again.');
    });
  };

  return (
    <div className="container"> 
      <h4>Smart Summarization</h4>
      
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

      {error && <div className="error">{error}</div>}
      {summary && (
        <div className="response-box">
          <h4>Summary:</h4>
          <p className="summary">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default App;
