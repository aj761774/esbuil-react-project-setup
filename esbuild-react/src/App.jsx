import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import img from "./images/img1.jpg";

const App = () => {
    return <div className="hello">
        <img src={img}/>
        hello world go there ddkrk!!!!!
        </div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />)