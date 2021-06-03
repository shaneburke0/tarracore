import React from "react";
import _ from "lodash";
import { Link, graphql } from "gatsby";
import SEO from "../components/seo";
import {
  Center,
  Showcase,
  HowToPlaySection,
  AboutUsSection,
  NewsletterSection,
  ComingSoonPage,
} from "../components";
import { slugify, isBoolTrue } from "../../utils/helpers";

const Home = ({ data: gqlData }) => {
  const { inventoryInfo } = gqlData;

  const liveCompetitions = _.filter(inventoryInfo.data, (d) => {
    return d.categories.includes("Competitions");
  });

  const isComingSoon = true;

  return (
    <>
      <SEO title="Home" />
      <div className="flex justify-center main-content">
        <div className="w-fw">
          {Array.isArray(liveCompetitions) &&
            !isComingSoon &&
            liveCompetitions.map((comp) => (
              <div className="w-full" key={slugify(comp.name)}>
                <div
                  className="lg:h-hero
        p-6 pb-10 smpb-6
        flex lg:flex-row flex-col"
                >
                  <div className="pt-4 pl-2 sm:pt-12 sm:pl-12 flex ">
                    <Link to={slugify(comp.name)}>
                      <Showcase imageSrc={comp.image} />
                    </Link>
                  </div>
                  <div className="flex flex-1 justify-center items-center relative">
                    <Center
                      price={comp.price}
                      title={comp.name}
                      link={slugify(comp.name)}
                      date={comp.endDate}
                      tickets={comp.maxInventory}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {isComingSoon && (
        <div className="">
          <ComingSoonPage />
        </div>
      )}

      <div className="mt-4 lg:mt-0">
        <div
          className="trustpilot-widget"
          data-locale="en-GB"
          data-template-id="5419b6a8b0d04a076446a9ad"
          data-businessunit-id="60aeb7306f4b750001c7394f"
          data-style-height="24px"
          data-style-width="100%"
          data-theme="light"
        >
          <a
            href="https://uk.trustpilot.com/review/tarracore.ie"
            target="_blank"
            rel="noopener"
          >
            Trustpilot
          </a>
        </div>
      </div>

      <HowToPlaySection />
      <div className="mobile:px-10 px-4 pb-10 flex justify-center pt-8">
        <div className="w-fw">
          <div className="flex lg:flex-row flex-col">
            <div className="flex-1 pb-8 lg:pb-4 mx-4">
              <AboutUsSection />
            </div>
            <div className="flex-1 pb-8 lg:pb-4 mx-4">
              <NewsletterSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const pageQuery = graphql`
  query {
    navInfo {
      data
    }
    categoryInfo {
      data {
        name
        image
        itemCount
      }
    }
    inventoryInfo {
      data {
        image
        name
        categories
        description
        id
        price
        endDate
        maxInventory
      }
    }
  }
`;

export default Home;
