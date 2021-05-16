import React from "react";
import SEO from "../components/seo";
import NavActions from "../components/NavActions";

const PreviousWinnersPage = (props) => {
  const {
    pageContext: { title },
  } = props;
  return (
    <>
      <SEO title="Previous Winners" />
      <div className="mobile:px-10 px-4 pb-10 flex justify-center main-content">
        <div className="w-fw">
          <div className="">
            <h1 className="text-5xl font-light mt-4">Previous Winners</h1>
            <div className="max-w-fw">
              <p>
                We are currently running our first competition, enter to become
                our very first winner!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviousWinnersPage;
