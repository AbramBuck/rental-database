import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../src/index.css';
import { Provider } from 'react-redux';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import { Modal, ModalProvider } from './context/Modal';
import EditSpotFormModal from './components/EditSpotFormModal/EditSpotFormModal';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider >
      <Provider store={store} value={EditSpotFormModal}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);




{/* if (process.env.NODE_ENV !== 'production') {
  window.store = store;
} */}