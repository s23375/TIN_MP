import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./18n";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// ReactDOM.render( why is everything about this tutorial outdated like just link a youtube video at this point ffs
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById("root")
// );