import React from "react"

const HowToPlaySection = () => {
  return (
    <div className="section__how-to-play p-8">
      <div className="mobile:px-10 px-4 pb-1 flex justify-center">
        <h2 className="text-3xl">How to play</h2>
      </div>

      <div className="flex flex-col lg:flex-row justify-evenly">
        <div className="rounded-lg p-4 text-center flex-1">
          <div className="rounded-full h-24 w-24 flex items-center justify-center mr-auto ml-auto bg-white text-gray-700 text-4xl">
            1
          </div>
          <h3 className="my-4">Pick your prize</h3>
          <p>Pick your favorite tractor or farm machine competition</p>
        </div>
        <div className="rounded-lg p-4 text-center flex-1">
          <div className="rounded-full h-24 w-24 flex items-center justify-center mr-auto ml-auto bg-white text-gray-700 text-4xl">
            2
          </div>
          <h3 className="my-4">Answer the question</h3>
          <p>Answer the multiple choice question</p>
        </div>
        <div className="rounded-lg p-4 text-center flex-1">
          <div className="rounded-full h-24 w-24 flex items-center justify-center mr-auto ml-auto bg-white text-gray-700 text-4xl">
            3
          </div>
          <h3 className="my-4">Watch the live draw</h3>
          <p>
            We'll stream the live draw on our Facebook page and be in touch if
            you win!
          </p>
        </div>
      </div>
    </div>
  )
}

export default HowToPlaySection
