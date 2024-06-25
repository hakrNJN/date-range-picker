import React, { useEffect, useReducer, useState } from "react"
import "../App.css"
import { useLanguage } from "../context/InitialParametersContext"
import { getInitialObject, getUpdatedObject } from "../utils/actionsUtils"
import { updateObject } from "../utils/generalUtils"
import { CalendarInstance as BoardInstance } from "./BoardInstance"
import { CalendarHeader } from "./CalendarHeaderComponents/CalendarHeader"
import { DaysAmountTabButton } from "./DaysAmountTabComponents/DaysAmountTabButton"

const datesHeaderInitialStateCalculation = (language, boardsNum) => {
  const stateObj = {
    viewedMonth: {},
    viewedYear: {},
  };

  for (let i = 0; i < boardsNum; i++) {
    const currentMonth = new Date().getMonth() + i;
    const currentYear = new Date().getFullYear();

    stateObj.viewedMonth[i] = currentMonth % 12;
    stateObj.viewedYear[i] = currentYear + Math.floor(currentMonth / 12);
  }

  if (language === "Hebrew" && boardsNum === 2) {
    [stateObj.viewedMonth[0], stateObj.viewedMonth[1]] = [
      stateObj.viewedMonth[1],
      stateObj.viewedMonth[0],
    ];
    [stateObj.viewedYear[0], stateObj.viewedYear[1]] = [
      stateObj.viewedYear[1],
      stateObj.viewedYear[0],
    ];
  }

  // console.log(stateObj);
  return stateObj;
};


function setViewedMonth(state, payload) {
  return updateObject(state, { viewedMonth: payload.viewedMonth })
}

function setViewedYear(state, payload) {
  return updateObject(state, { viewedYear: payload.viewedYear })
}

function datesHeaderReducerMapper(state, payload) {
  // console.log('state :', state, 'payload : ',payload)
  if (payload.type === "SET_VIEWED_MONTH") {
    payload.viewedMonth = getUpdatedObject(
      payload.boardsNum,
      payload.id,
      payload.viewedMonth,
      state.viewedMonth
    )
    return setViewedMonth(state, payload)
  } else if (payload.type === "SET_VIEWED_YEAR") {
    // console.log('state :', state, 'payload : ',payload)
    payload.viewedYear = getUpdatedObject(
      payload.boardsNum,
      payload.id,
      payload.viewedYear,
      state.viewedYear
      )
      return setViewedYear(state, payload)
    } else {
      return state
    }
  }
  
function getMarginLeft(boardsNum) {
  if (boardsNum === 1) {
    return { marginLeft: "255px" }
  } else if (boardsNum === 2) {
    return { marginLeft: 255 / 2 + "px" }
  }
  return {};
}

export const Mapper = (props) => {
  const {
    boardsNum,
    startDate,
    endDate,
    defaultColor,
    showCalendar,
    setButtonDatesText,
    setShowCalendar,
    callback,
  } = props

  const language = useLanguage()
  const datesHeaderInitialState = datesHeaderInitialStateCalculation(
    language,
    boardsNum
  )

  // console.log('datesHeaderInitialState : ',datesHeaderInitialState)
  const [datesHeaderState, datesHeaderStateDispatch] = useReducer(
    datesHeaderReducerMapper,
    datesHeaderInitialState
  )

  // console.log('DatesHeaderState : ',datesHeaderState)
  const calendarsIndexes = [...Array(boardsNum).keys()]
  const marginLeftStyle = getMarginLeft(boardsNum)

  const [chosenDatesList, setChosenDatesList] = useState([])
  const [storedDates, setStoredDates] = useState([])
  const [selectedColor, setSelectedColor] = useState("#219643")
  const [selectedDays, setSelectedDays] = useState([])
  const [hoveredDay, setHoveredDay] = useState(null)

  useEffect(() => {
    if (language) {
      let { monthsObj, yearsObj } = getInitialObject(
        boardsNum,
        language,
        startDate,
        endDate
      )
      for (let id = 0; id < boardsNum; id++) {
        datesHeaderStateDispatch(setViewedMonth(boardsNum, id, monthsObj))
        datesHeaderStateDispatch(setViewedYear(boardsNum, id, yearsObj))
      }
    } else {
      throw Object.assign(new Error('"language" prop is undefined'), {
        code: 403,
      })
    }

    if (defaultColor) {
      setSelectedColor(defaultColor)
    }
  }, [boardsNum, defaultColor, endDate, language, startDate])

  return (
    <React.Fragment>
      {showCalendar && (
        <div className="date-range-picker" style={marginLeftStyle}>
          <CalendarHeader
            selectedColor={selectedColor}
            setSelectedDays={setSelectedDays}
            selectedDays={selectedDays}
            hoveredDay={hoveredDay}
            datesHeaderStateDispatch={datesHeaderStateDispatch}
            storedDates={storedDates}
            setStoredDates={setStoredDates}
            chosenDatesList={chosenDatesList}
            setChosenDatesList={setChosenDatesList}
            boardsNum={boardsNum}
          />
          {calendarsIndexes.map((i) => {
             return (
              <BoardInstance
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                setSelectedDays={setSelectedDays}
                selectedDays={selectedDays}
                setHoveredDay={setHoveredDay}
                hoveredDay={hoveredDay}
                datesHeaderState={datesHeaderState}
                datesHeaderStateDispatch={datesHeaderStateDispatch}
                storedDates={storedDates}
                setStoredDates={setStoredDates}
                chosenDatesList={chosenDatesList}
                setChosenDatesList={setChosenDatesList}
                setButtonDatesText={setButtonDatesText}
                setShowCalendar={setShowCalendar}
                callback={callback}
                boardsNum={boardsNum}
                key={i}
                i={i}
              />
            )
          })}
          <DaysAmountTabButton
            selectedColor={selectedColor}
            datesHeaderStateDispatch={datesHeaderStateDispatch}
            setSelectedDays={setSelectedDays}
            boardsNum={boardsNum}
          />
        </div>
      )}
    </React.Fragment>
  )
}

