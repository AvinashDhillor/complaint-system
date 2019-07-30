import React from 'react';
import { Toast } from 'react-bootstrap';

const ToastPanel = props => {
  return (
    <>
      <Toast
        show={props.isEnable}
        style={{
          position: 'fixed',
          right: 20,
          bottom: 50,
          zIndex: 1000
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">
            <i className="fas fa-robot mr-1" />
            Micky
          </strong>
        </Toast.Header>
        <Toast.Body>{props.text}</Toast.Body>
      </Toast>
    </>
  );
};

export default ToastPanel;
