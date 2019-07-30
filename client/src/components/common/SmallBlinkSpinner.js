import React from 'react';

const SmallBlinkSpinner = () => {
  return (
    <span
      className="spinner-grow text-secondary spinner-grow-sm ml-2"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </span>
  );
};

export default SmallBlinkSpinner;
