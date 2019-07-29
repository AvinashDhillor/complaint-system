import React from 'react';

const SmallBlinkSpinner = () => {
  return (
    <span
      class="spinner-grow text-secondary spinner-grow-sm ml-2"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </span>
  );
};

export default SmallBlinkSpinner;
