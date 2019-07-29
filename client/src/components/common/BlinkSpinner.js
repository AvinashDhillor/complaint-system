import React from 'react';

const BlinkSpinner = () => {
  return (
    <div class="d-flex justify-content-center">
      <div class="spinner-grow m-3" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default BlinkSpinner;
