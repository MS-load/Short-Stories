import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from './errorBoundary';


ReactDOM.render(
    (<BrowserRouter basename="/short_stories">
        <ErrorBoundary>
            <App />
        </ErrorBoundary>

    </BrowserRouter>
    )
    , document.getElementById('root'))