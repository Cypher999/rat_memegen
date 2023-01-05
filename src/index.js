import ReactDOM from "react-dom";
import React from "react";
import App from './App';
import {createRoot} from "react-dom/client"
// import App from './setState';
import './style.css'
let root=createRoot(document.getElementById('root'));

root.render(
    <App/>
)