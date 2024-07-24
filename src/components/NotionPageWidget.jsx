import React from 'react';

const NotionPageWidget = () => {
  return (
    <div className="widget">
      <h3>Notion Page</h3>
      <iframe
        src="https://www.notion.so/"
        width="100%"
        height="300px"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default NotionPageWidget;
