

import React, { useState, useEffect } from 'react';
import { fetchDailyQuote } from './utils/fetchQuote';
import './DailyQuote.css';
import { motion } from 'framer-motion';

const DailyQuote = () => {
  const [quote, setQuote] = useState({ content: '', author: '' });

  useEffect(() => {
    const getQuote = async () => {
      const dailyQuote = await fetchDailyQuote();
      setQuote(dailyQuote);
    };
    getQuote();
  }, []);

  return (
    <motion.div className="daily-quote-widget"
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    viewport={{ once: false, amount: 0.5 }}>
      <h3>Daily Quote</h3>
      <blockquote className="quote-content">“{quote.content}”</blockquote>
      <p className="quote-author">- {quote.author}</p>
    </motion.div>
  );
};

export default DailyQuote;