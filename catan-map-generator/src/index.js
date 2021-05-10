import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducer/reducer';

const store = createStore(rootReducer);

const app = (
    <Provider store = {store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

reportWebVitals();
