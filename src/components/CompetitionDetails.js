import React, { useState } from "react";
import { Link } from "gatsby";
import moment from "moment";
import Popup from "reactjs-popup";

const CompetitionDetails = ({ currentInventory, maxInventory, endDate }) => {
  const [showFreeEntry, setFreeEntry] = useState(false);
  const contentStyle = { maxWidth: "90%", width: "400px", height: "auto" };

  return (
    <div>
      <h3>Competition Details</h3>
      <Popup
        open={showFreeEntry}
        closeOnDocumentClick
        onClose={() => setFreeEntry(false)}
        modal
        {...{ contentStyle }}
      >
        <div className="text-left p-4 mb-4 h-4/6 overflow-auto">
          <span
            role="button"
            tabIndex="0"
            className="modal-close"
            onClick={() => setFreeEntry(false)}
            onKeyDown={() => setFreeEntry(false)}
          >
            &times;
          </span>
          <div className="text-sm">
            <h4>Free Entry Route</h4>
            <p>
              Send an unenclosed postcard to Tarracore Limited, 25 Grallow Wood,
              Abbeyleix, Laois, R32 XP60 containing the following information:
            </p>
            <ul>
              <li>The competition you wish to enter</li>
              <li>Your full name and address</li>
              <li>Email address and Telephone number</li>
              <li>Your Date of Birth</li>
              <li>Your answer to the competition question</li>
            </ul>
            <p>
              Your entry will be subject to our{" "}
              <Link to="/terms-and-conditions" className="text-green-700">
                Terms &amp; Conditions
              </Link>
            </p>
          </div>
        </div>
      </Popup>
      <div
        className="text-green-700 mb-4 text-sm"
        onClick={() => setFreeEntry(true)}
      >
        Free Entry Route Available
      </div>
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
        Competitions are not sponsored, endorsed or administered by, or
        associated with Facebook or Instagram.
        <br />
        <br />
        Please ensure that you double check your answer to the multiple choice
        question. Entrants who incorrectly answer the question will be charged
        and will not be entered into the draw,
        <br />
        <br />
        The Maximum number of entries for this competition including free
        entries is {maxInventory}
        <br />
        <br />
        There are currently {currentInventory} tickets remaining for this
        Competition.
        <br />
        <br />
        Note: This Competition will run until {moment(endDate).format(
          "LL"
        )}{" "}
        when the timer above runs down, or if it sells out sooner, the live draw
        will take place the next day. See our{" "}
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
  );
};

export default CompetitionDetails;
