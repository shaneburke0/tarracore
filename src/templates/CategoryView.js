import React from "react";
import SEO from "../components/seo";
import ListItem from "../components/ListItem";
import { titleIfy, slugify, isBoolTrue } from "../../utils/helpers";
// const comingSoonImage = require("../images/img-coming-soon.png");

const CategoryView = (props) => {
  const {
    pageContext: {
      title,
      content: { items = [] },
      seo,
    },
  } = props;

  const isComingSoon = false;

  return (
    <>
      <SEO {...seo} />
      <div className="mobile:px-10 px-4 pb-10 flex justify-center main-content">
        <div className="w-fw">
          <div className="">
            <h1 className="text-5xl font-light mt-4">{titleIfy(title)}</h1>
            <div className="max-w-fw flex">
              <div>
                <div className="flex flex-1 flex-wrap flex-row">
                  {items.map((item, index) => {
                    return (
                      <ListItem
                        key={index}
                        link={isComingSoon ? "/" : slugify(item.name)}
                        title={isComingSoon ? "Coming Soon" : item.name}
                        price={item.price}
                        imageSrc={item.image}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryView;
