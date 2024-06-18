import React, { useState } from "react";
import { InitialParametersProvider } from "../context/InitialParametersContext";
import { Button } from "./Button";
import { CalendarComponent } from "./CalendarComponent";

export const DateRangePicker = (props) => {
    const {
        callback,
        boardsNum: propsBoardsNum,
        startDate,
        endDate,
        defaultColor,
    } = props;

    let boardsNumInitialState = propsBoardsNum || 2;
    const [showCalendar, setShowCalendar] = useState(false);
    const [buttonDatesText, setButtonDatesText] = useState(null);

    return (
        <InitialParametersProvider value={props}>
            <Button
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
                buttonDatesText={buttonDatesText}
            />
            <CalendarComponent
                callback={callback}
                boardsNum={boardsNumInitialState}
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
                buttonDatesText={buttonDatesText}
                setButtonDatesText={setButtonDatesText}
                startDate={startDate}
                endDate={endDate}
                defaultColor={defaultColor}
            />
        </InitialParametersProvider>
    );
};