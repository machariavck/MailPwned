import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import pwn from './api/api';
import { UserProvider } from './context/usercontext';

const rootElement = document.getElementById("root");
ReactDOM.render(
      <ApolloProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ApolloProvider>,rootElement    
);