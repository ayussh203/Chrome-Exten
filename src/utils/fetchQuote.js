

export const fetchDailyQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random?tags=inspirational');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching quote:', error);
      return { content: 'An error occurred.', author: 'Unknown' };
    }
  };