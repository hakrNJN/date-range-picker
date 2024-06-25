import React from "react"
import ReactDOM from 'react-dom/client'
import App from "./App"
import DateRangePicker from "./DateRangePicker"
import "./index.css"
import * as serviceWorker from "./serviceWorker"

export { DateRangePicker }


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <React.Fragment>
      <div className="sub-title">Range picker (default values)</div>
      <App />
    </React.Fragment>
  // </React.StrictMode>
)

// If you want your App to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
