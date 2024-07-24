import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookQuoteWidget = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get('http://localhost:3002/quote');
        setQuote(response.data);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote({ author: 'Error', text: 'Unable to fetch quote' });
      }
    };

    fetchQuote();
  }, []);

  const refreshQuote = async () => {
    try {
      const response = await axios.get('http://localhost:3002/quote');
      setQuote(response.data);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({ author: 'Error', text: 'Unable to fetch quote' });
    }
  };

  return (
    <div className="widget">
      <h3>Book + Quote</h3>
      {quote ? (
        <div>
          <p><strong>{quote.author}</strong></p>
          <p>{quote.text}</p>
          <button onClick={refreshQuote}>Show Another</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookQuoteWidget;
