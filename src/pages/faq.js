import React from "react";
import Faq from "react-faq-component";
import { Link } from "gatsby";
import SEO from "../components/seo";
import NavActions from "../components/NavActions";

const FaqPage = (props) => {
  const {
    pageContext: { title },
  } = props;

  const data = {
    title: "",
    rows: [
      {
        title: "I don't have a Facebook account, can I still enter?",
        content: (
          <p className="text-gray-700 text-sm">
            Yes, of course you can. Competitions are not linked with any other
            company including facebook. You will need to create an account on
            the Tarracore website to enter.
          </p>
        ),
      },
      {
        title: "How will I know if I win?",
        content: (
          <p className="text-gray-700 text-sm">
            Easy, we'll contact you. All our draws are live streamed on Facebook
            so you can watch that to find out first hand. We call or email all
            winners after the draw to shrae the good news and arrange delivery.
          </p>
        ),
      },
      {
        title: "Is the winning ticket selected at random?",
        content: (
          <p className="text-gray-700 text-sm">
            It sure is. We use Google's Random Number generator to select the
            winning ticket.
          </p>
        ),
      },
      {
        title: "What happens if the winning ticket was not assigned?",
        content: (
          <p className="text-gray-700 text-sm">
            Good question, in the case where a winning ticket is assigned to an
            entrant, we will draw again until we find a ticket assigned to a
            entrant. This may occur when the draw is not a sell out or an
            entrant does not correctly answer the question.
          </p>
        ),
      },
      {
        title: "Can I enter a competition for free?",
        content: (
          <p className="text-gray-700 text-sm">
            Of course, each competiton has a free entry method. See the
            competition page or the terms and conditions for details. We may
            also add extra free entry places to some competitions, please see
            our{" "}
            <a
              className="text-green-700"
              href="https://www.facebook.com/TarracoreIrl"
              target="_blank"
              rel="noreferrer"
            >
              Facebook page
            </a>{" "}
            for updates.
          </p>
        ),
      },
      {
        title: "What are the Terms & Conditions?",
        content: (
          <p className="text-gray-700 text-sm">
            Here at our{" "}
            <Link className="text-green-700" to="/terms-and-conditions">
              terms and conditions
            </Link>
          </p>
        ),
      },
    ],
  };

  const styles = {
    // bgColor: 'white',
    titleTextColor: "#0e1215",
    rowTitleColor: "#0e1215",
    // rowContentColor: 'grey',
    // arrowColor: "red",
  };

  const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
  };

  return (
    <>
      <SEO title="FAQ" />
      <div className="mobile:px-10 px-4 pb-10 flex justify-center main-content">
        <div className="">
          <div className="">
            <h1 className="text-5xl font-light mt-4">{title}</h1>
            <div className="max-w-fw">
              <Faq data={data} styles={styles} config={config} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqPage;
