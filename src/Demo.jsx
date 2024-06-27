import React from 'react';
import DateRangePicker from './DateRangePicker';
import DatePicker from './Test/components';

function callbackFunction(dates) {
    console.log(`The range of dates that got picked is: ${dates.text}`)
    console.log(`The min date that got picked is: ${dates.minDate}`)
    console.log(`The max date that got picked is: ${dates.maxDate}`)
    console.log(
        `The number of days that got picked is: ${dates.numberOfDaysPicked}`
    )
    console.log(`All dates: ${dates.allDates}`)
}

const onDateSelect = (startDate, endDate) => {
    console.log(
        ' date selected: startDate => %s , endDate => %s',
        startDate,
        endDate
    );
};

const onClose = (startDate, endDate) => {
    console.log(
        ' ok/select:  startDate => %s , endDate => %s ',
        startDate,
        endDate
    );
};

const Demo = () => {
    return (
        <div>
            <DateRangePicker colorsPalette={'disabled'} callback={callbackFunction} />
            <div>
                <DatePicker
                    onDateSelected={onDateSelect}
                    defaultValue={{
                        startDate: new Date(),
                        endDate: ''
                    }}
                    onClose={onClose}
                    onOpen={() => console.log(' openend')}
                 dateFormat="dd-MM-YYYY"
                // disableRange
                // rangeTillEndOfDay
                // selectTime
                />
            </div>
        </div>
    )
}

export default Demo
