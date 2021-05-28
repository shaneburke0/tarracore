import React from "react";
import SEO from "../components/seo";
import ListItem from "../components/ListItem";
import { titleIfy, slugify } from "../../utils/helpers";
// const comingSoonImage = require("../images/img-coming-soon.png");

const CategoryView = (props) => {
  const {
    pageContext: {
      title,
      content: { items = [] },
      seo,
    },
  } = props;

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
                        link={
                          window.TCORE_SHOW_COMING_SOON
                            ? "/"
                            : slugify(item.name)
                        }
                        title={
                          window.TCORE_SHOW_COMING_SOON
                            ? "Coming Soon"
                            : item.name
                        }
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
