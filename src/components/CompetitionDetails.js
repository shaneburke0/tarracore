import React from "react"
import { Link } from "gatsby"
import moment from "moment"

const CompetitionDetails = ({ currentInventory, maxInventory, endDate }) => (
  <div>
    <h3>Competition Details</h3>
    <article>
      When entering this competition you will be required to agree to our{" "}
      <Link to="/terms-and-conditions" className="text-green-700">
        Terms &amp; Conditions
      </Link>
      . Please read and understand our rules and regulations.
      <br />
      <br />
      We do provide a free entry method to our competitions, please see Terms
      Section{" "}
      <Link to="/terms-and-conditions#free-entry" className="text-green-700">
        3.10
      </Link>{" "}
      or checkout our{" "}
      <a
        href="https://www.facebook.com/TarracoreIrl"
        className="text-green-700"
        target="_blank"
        rel="noreferrer"
      >
        Facebook page
      </a>{" "}
      for latest information.
      <br />
      <br />
      Competitions are not sponsored, endorsed or administered by, or associated
      with Facebook or Instagram.
      <br />
      <br />
      Please ensure that you double check your answer to the multiple choice
      question. Entrants who incorrectly answer the question will be charged and
      will not be entered into the draw,
      <br />
      <br />
      The Maximum number of entries for this competition including free entries
      is {maxInventory}
      <br />
      <br />
      There are currently {currentInventory} tickets remaining for this
      Competition.
      <br />
      <br />
      Note: This Competition will run until {moment(endDate).format("LL")} when
      the timer above runs down, or if it sells out sooner, the live draw will
      take place the next day. See our{" "}
      <a
        href="https://www.facebook.com/TarracoreIrl"
        className="text-green-700"
        target="_blank"
        rel="noreferrer"
      >
        Facebook page
      </a>{" "}
      to keep up-to-date on the draw.
    </article>
  </div>
)

export default CompetitionDetails
