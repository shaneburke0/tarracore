import React from "react"
import SEO from "../components/seo"
import ListItem from "../components/ListItem"
import { titleIfy, slugify } from "../../utils/helpers"
import NavActions from "../components/NavActions"

const CategoryView = props => {
  const {
    pageContext: {
      title,
      content: { items = [] },
      seo,
    },
  } = props
  return (
    <>
      <SEO {...seo} />
      <NavActions />
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
                        link={slugify(item.name)}
                        title={item.name}
                        price={item.price}
                        imageSrc={item.image}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryView
