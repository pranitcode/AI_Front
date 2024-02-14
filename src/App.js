import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [textInput, setTextInput] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSummarizeClick = () => {
    axios.post('/app/summarize', { text: textInput }, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      setSummary(response.data.summary);
      setError('');
    })
    .catch(error => {
      setError('Error summarizing text. Please try again.');
    });

    // setTextInput('');
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
