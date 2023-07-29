'use client'
import React from 'react';

const ErrorException = (props) => {
    return (
        <div className=' text-red-700 font-bold text-center'>
            {props.message}
        </div>
    );
}

export default ErrorException;
