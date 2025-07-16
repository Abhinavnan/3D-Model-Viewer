import React from 'react';
import ReactDOM from 'react-dom/client'; // Use react-dom/client for React 18
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react"; //for permanaet storage
import { store, persistor } from './shared/Redux/store';
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
