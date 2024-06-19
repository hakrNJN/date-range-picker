import React from "react"
import { calendarConfig } from "../../configuration/config"
import {
  useFirstDayOfWeekIndex,
  useLanguage,
} from "../../context/InitialParametersContext"
import "../../styles/CalendarModesStyles/week.css"

export const WeekDaysNames = () => {
  const firstDayOfWeekIndex = useFirstDayOfWeekIndex()
  const language = useLanguage()

  let weekdays = calendarConfig.weeks[language]

  weekdays = weekdays
    .slice(firstDayOfWeekIndex)
    .concat(weekdays.slice(0, firstDayOfWeekIndex))
  let count = 0

  return (
    <React.Fragment>
      {weekdays.map((weekday) => {
        count++
        const style = { gridColumn: count }
        return (
          <div key={weekday} className="weekday" style={style}>
            {weekday}
          </div>
        )
      })}
    </React.Fragment>
  )
}
