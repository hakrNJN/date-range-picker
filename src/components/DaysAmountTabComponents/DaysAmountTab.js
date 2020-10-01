import React, { useEffect, useState, Profiler } from 'react';
import '../../styles/DaysAmountTabStyles/days-amount-tab.css';
import { daysAmountTabConfig } from '../../configuration/config';
import { getDefaultRanges } from '../../utils/utils';
import { useEndDate, useStartDate } from '../../context/InitialParametersContext';

export function DaysAmountTab(props) {

    const { 
        selectedColor,
        selectedDays, 
        setSelectedDays
    } = props;
    const style = {"backgroundColor": selectedColor + '60'};
    const errorClassName = " error-input";
    const defaultClassName = "days-amount-input";

    const [inputClassName, setInputClassName] = useState(defaultClassName);
    const startDate = useStartDate();
    const endDate = useEndDate();
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let date = currentDate.getDate();
    const defaultRanges = getDefaultRanges(year, month, date);

    function updateCalendar(decresement) {
        let daysAmountBackwards = new Date(year, month, date - decresement);
        setSelectedDays([daysAmountBackwards, currentDate]);
    }

    const [daysAmount, setDaysAmount] = useState("");

    const handleChange = (e) => {
        let value = e.target.value;
        let nonNumericChar = /[^0-9-]+/g;
        let pattern = /([-])?([0-9]+)/g;
        let matches = value.match(pattern);

        value = value.replace(nonNumericChar, '');
        if (matches){
            value = matches[0];
        }
        if (value.length > 4) {
            value = value.substring(0, 4);
            errorInput();
        }
        setDaysAmount(value);
    }

    function errorInput() {
        setInputClassName(defaultClassName + errorClassName);
        setTimeout(() => {
            setInputClassName(defaultClassName);
        }, 3000);
    }

    useEffect(() => {
        if ((daysAmount && daysAmount[0] !== "-")||
            (daysAmount[0] === "-" && !isNaN(daysAmount[daysAmount.length - 1]))) {
            if (parseInt(daysAmount) > 0) {
                updateCalendar(parseInt(daysAmount) - 1);
            } else {
                updateCalendar(daysAmount);
            }
        } else {
            setSelectedDays([])
        }
        
    }, [daysAmount])


    return (
    <>
        <div className="days-amount-tab-template">
            <div 
                className="days-amount-tab-div" 
                style={style}
            >
                {defaultRanges.map((range, i) => {
                    return (<DefaultRange 
                        key={i}
                        range={range}
                        index={i} 
                        setSelectedDays={setSelectedDays}
                    />);
                })}
                <div className="days-amount-field">
                    <input 
                        className={inputClassName}
                        onChange={e => handleChange(e)}
                        value={daysAmount}
                    />
                    {" Days Backwards"}
                </div>
            </div>
        </div>
    </>
    )
}

export default function DefaultRange(props) {
    const { range, index , setSelectedDays} = props;
    const className = "pickable-days-amount";

    const handleClick = (dates) => () => {
        setSelectedDays(dates);
    }

    return (
        <div 
            className={className}
            onClick={handleClick(range)}
        >
            {daysAmountTabConfig.defualtRangesTexts[index]}
        </div>
    )
}
