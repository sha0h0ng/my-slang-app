import React, { useState } from 'react';
import {
  Container,
  Form,
  Card,
  ListGroup,
  Button,
  InputGroup,
} from 'react-bootstrap';
import { slangMap } from './slangData';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);

  const handleSearchChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchTerm(input);

    // Generate suggestions based on partial matches in the term
    const suggestionList = [];
    slangMap.forEach((value, key) => {
      if (key.includes(input) && input.length > 0) {
        suggestionList.push(key);
      }
    });

    setSuggestions(suggestionList);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission on Enter

      // Search for results only when the Enter key is pressed
      const resultList = [];
      slangMap.forEach((value, key) => {
        if (key.includes(searchTerm) || value.meaning.includes(searchTerm)) {
          resultList.push({ term: key, ...value });
        }
      });

      setResults(resultList);
      setSuggestions([]); // Hide suggestions after search
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);

    // When a suggestion is clicked, perform the search
    const resultList = [];
    slangMap.forEach((value, key) => {
      if (key === suggestion) {
        resultList.push({ term: key, ...value });
      }
    });

    setResults(resultList);
    setSuggestions([]); // Hide suggestions after selection
  };

  return (
    <Container className='my-5 p-4 bg-light rounded'>
      <h1 className='text-center mb-4'>Gen Z Slang Dictionary</h1>

      <Form.Group controlId='formSearch'>
        <InputGroup className='mb-4'>
          <Form.Control
            type='text'
            placeholder='Search for a slang term...'
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            className='shadow-sm'
          />
          <Button
            variant='outline-secondary'
            onClick={() => handleKeyPress({ key: 'Enter' })}
          >
            Search
          </Button>
        </InputGroup>
      </Form.Group>

      {/* Suggestion Dropdown */}
      {suggestions.length > 0 && (
        <ListGroup className='mb-4 shadow-sm'>
          {suggestions.map((suggestion, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => handleSuggestionClick(suggestion)}
              className='d-flex justify-content-between align-items-center'
            >
              {suggestion}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {results.length > 0 ? (
        results.map((result, index) => (
          <Card className='mb-4 shadow-sm' key={index}>
            <Card.Body>
              <Card.Title className='text-primary'>{result.term}</Card.Title>
              <Card.Text>
                <strong>Meaning:</strong> {result.meaning}
              </Card.Text>
              <Card.Text>
                <strong>Example:</strong> {result.example}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className='text-center text-muted'>No results found</p>
      )}
    </Container>
  );
}

export default App;
