import React from "react"
import "./ProgressBar.css"

const ProgressBar = ({ currentInventory, maxInventory }) => {
  const itemsSold = maxInventory - currentInventory
  const percantage = 100 - (itemsSold / maxInventory) * 100

  return (
    <div className="progress-container">
      <div className="progress-amounts">
        <span className="text-xs">0</span>
        <span className="text-xs">{maxInventory}</span>
      </div>
      <div className="progress-bar">
        <div className="filler" style={{ width: `${percantage}%` }}></div>
      </div>
      <div className="text-xs">Tickets remaining: {currentInventory}</div>
    </div>
  )
}

export default ProgressBar
