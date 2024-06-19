import React from "react"
import ReactDOM from 'react-dom'
import DateRangePicker from "./App"
import "./index.css"
import * as serviceWorker from "./serviceWorker"

export { DateRangePicker }

function callbackFunction(dates) {
    console.log(`The range of dates that got picked is: ${dates.text}`)
    console.log(`The min date that got picked is: ${dates.minDate}`)
    console.log(`The max date that got picked is: ${dates.maxDate}`)
    console.log(
      `The number of days that got picked is: ${dates.numberOfDaysPicked}`
    )
    console.log(`All dates: ${dates.allDates}`)
  }
  
  ReactDOM.render(
    <React.Fragment>
      <div className="sub-title">Range picker (default values)</div>
          <DateRangePicker colorsPalette={'disabled'} callback={callbackFunction} />
      
    </React.Fragment>,
    document.getElementById("root")
  )
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister()
  