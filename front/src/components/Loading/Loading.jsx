import React from 'react';
import { Spinner } from 'react-bootstrap';

const spinnerStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '50px'
}

const Loading = () => {
    return (
        <div style={spinnerStyle}>
            <Spinner animation='border' as='div' />
        </div>
    );
}

export default Loading;