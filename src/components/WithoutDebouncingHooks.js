import React, { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const WithoutDebouncingHooks = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const input = event.target.value;
    setInput(input);
    setIsLoading(true);
    axios
      .get(`https://www.reddit.com/search.json?q=${input}`)
      .then((result) => {
        setResult(result.data.data.children);
        setErrorMsg('');
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMsg('Something went wrong. Try again later.');
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="search-section">
        <h1>Debouncing Demo</h1>
        <Form>
          <Form.Group controlId="search">
            <Form.Control
              type="search"
              placeholder="Enter text to search"
              onChange={handleInputChange}
              value={input}
              autoComplete="off"
            />
          </Form.Group>
          {errorMsg && <p>{errorMsg}</p>}
          {isLoading && <p className="loading">Loading...</p>}
          <ul className="search-result">
            {result.map((item, index) => (
              <li key={index}>{item.data.title}</li>
            ))}
          </ul>
        </Form>
      </div>
    </div>
  );
};

export default WithoutDebouncingHooks;
