import React from 'react';

const BlinkSpinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-grow m-3" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default BlinkSpinner;
