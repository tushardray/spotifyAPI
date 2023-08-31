import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import HomePage from './webPages/HomePage';
import SearchResults from "./webPages/SearchResults";
import Callback from "./webPages/Callback";


// ALL REACT COMPONENTS MUST START WITH A CAPITAL LETTER
export const Paths = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ "/" } element={ <HomePage /> } />
                <Route path={ "/SearchResults" } element={ <SearchResults /> } />
                <Route path={ "/callback" } element={ <Callback /> } />
            </Routes>
        </BrowserRouter>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <Paths />
    // </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
