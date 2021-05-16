import React from "react";
import SEO from "../components/seo";
import NavActions from "../components/NavActions";

const TermsOfUsePage = (props) => {
  const {
    pageContext: { title },
  } = props;
  return (
    <>
      <SEO title="Terms of Use" />
      <div className="mobile:px-10 px-4 pb-10 flex justify-center main-content">
        <div className="w-fw">
          <div className="">
            <h1 className="text-5xl font-light mt-4">{title}</h1>
            <div className="max-w-fw flex">
              <p>{title} page </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfUsePage;
