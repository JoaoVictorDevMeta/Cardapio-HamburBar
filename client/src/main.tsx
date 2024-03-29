import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { persistor, store } from './redux/store.tsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
    </PersistGate>
  </Provider>
)