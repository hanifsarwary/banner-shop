import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter >
        <ScrollToTop />
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();