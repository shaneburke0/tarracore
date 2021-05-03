import React from "react"
import { Button } from "../"
import { navigate } from "gatsby"
import moment from "moment"
import { numberFormat } from "../../../utils/helpers"

const Center = ({ price, title, link, date, tickets }) => {
  function navigateTo() {
    navigate(link)
  }

  return (
    <div>
      <p className="text-4xl xl:text-5xl font-bold tracking-widest leading-none">
        {title}
      </p>
      <p>
        {date && (
          <span>
            Draw date:{" "}
            <span className="font-semibold">{moment(date).format("LLLL")}</span>
          </span>
        )}
      </p>
      <p>
        {tickets && (
          <span>
            Max tickets: <span className="font-semibold">{tickets}</span>
          </span>
        )}
      </p>
      <p>
        <span>
          Price: <span className="font-semibold">{numberFormat(price)}</span>
        </span>
      </p>
      <Button onClick={navigateTo} title="Get Tickets" />
    </div>
  )
}

export default Center
