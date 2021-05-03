import React, { useState, useEffect } from "react"
import moment from "moment"
import "./CountdownTimer.css"

const CountdownTimer = ({ endDate }) => {
  const [date, setDate] = useState({
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  function durationAsString(end) {
    const diff = moment(end).diff(moment())

    if (diff <= 0) return

    const duration = moment.duration(diff)

    setDate({
      weeks: Math.floor(duration.asWeeks()),
      days: Math.floor(duration.asDays() % 7),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    })
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      durationAsString(endDate)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [endDate])

  return (
    <>
      <div className="countdown">
        <div className="card">
          <div className="countdown-value">{date.weeks}</div>
          <div className="countdown-unit">Weeks</div>
        </div>
        <div className="card">
          <div className="countdown-value">{date.days}</div>
          <div className="countdown-unit">Days</div>
        </div>
        <div className="card">
          <div className="countdown-value">{date.hours}</div>
          <div className="countdown-unit">Hours</div>
        </div>
        <div className="card">
          <div className="countdown-value">{date.minutes}</div>
          <div className="countdown-unit">Mins</div>
        </div>
        <div className="card">
          <div className="countdown-value">{date.seconds}</div>
          <div className="countdown-unit">Secs</div>
        </div>
      </div>
    </>
  )
}

export default CountdownTimer
