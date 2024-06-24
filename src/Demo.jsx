import React from 'react'
import DateRangePicker from './DateRangePicker'

function callbackFunction(dates) {
    console.log(`The range of dates that got picked is: ${dates.text}`)
    console.log(`The min date that got picked is: ${dates.minDate}`)
    console.log(`The max date that got picked is: ${dates.maxDate}`)
    console.log(
        `The number of days that got picked is: ${dates.numberOfDaysPicked}`
    )
    console.log(`All dates: ${dates.allDates}`)
}


const Demo = () => {
    return (
        <div>
            <DateRangePicker colorsPalette={'disabled'} callback={callbackFunction} />
        </div>
    )
}

export default Demo
