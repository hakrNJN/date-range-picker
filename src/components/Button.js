import React from "react"
import {
  useFormat,
  useLanguage,
  usePickMethod,
} from "../context/InitialParametersContext"
import "../styles/button.css"
import { chosenDatesCalculation } from "../utils/generalUtils"


export const Button = (props) => {
  const { setShowCalendar, showCalendar, buttonDatesText } = props

  const language = useLanguage()
  const format = useFormat()
  const pickMethod = usePickMethod()
  const formatPattern = chosenDatesCalculation(
    [],
    null,
    format,
    pickMethod,
    language
  )
  let text = buttonDatesText
  if (!text) {
    text = formatPattern
  }

  const handleClick = () => {
    setShowCalendar(!showCalendar)
  }

  return (
    <React.Fragment>
      <button className="button" onClick={handleClick}>
        {text}
      </button>
    </React.Fragment>
  )
}
