import React from 'react';
import BaseUrlContext from './BaseUrlContext';

const BaseUrlProvider = ({ children }) => {
    const baseUrl = 'http://192.168.0.125:8000';

    return (
        <BaseUrlContext.Provider value={baseUrl}>
            {children}
        </BaseUrlContext.Provider>
    );
};

export default BaseUrlProvider;