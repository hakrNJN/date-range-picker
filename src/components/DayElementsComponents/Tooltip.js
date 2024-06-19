import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { useFormat } from "../../context/InitialParametersContext"
import "../../styles/DayElementsStyles/tooltip.css"
import { placeDateInFormat } from "../../utils/generalUtils"

export default function Tooltip(props) {
  const { hoveredDay, dateRef } = props

  const format = useFormat()
  const ref = useRef()
  const date = placeDateInFormat(hoveredDay, format)
  let top,
    left,
    height,
    style = { left: 200 + "%" }
  const [width, setWidth] = useState()
  if (dateRef && width) {
    let boundingClient = dateRef.getBoundingClientRect()
    height = boundingClient.height
    top = boundingClient.top
    left = boundingClient.left
    style = {
      left: left - width / 2 + "px",
      top: top + 1.15 * height + "px",
    }
  }

  useEffect(() => {
    let timeout
    if (!width) {
      timeout = setTimeout(() => {
        if (ref.current) {
          setWidth(ref.current.getBoundingClientRect().width)
        }
      }, 1000)
    }
    return () => {
      if (timeout) {
        clearTimeout()
      }
    }
  }, [width])

  return ReactDOM.createPortal(
    <React.Fragment>
      <div className="tooltip" style={style} ref={ref}>
        {date}
      </div>
    </React.Fragment>,
    document.getElementById("root")
  )
}
