import React from "react"

const NewsletterSection = () => {
  return (
    <div>
      <h3 className="">Don't Miss Out</h3>
      <p>
        Be the first to hear about our latest competitions as soon as they are
        live!
      </p>
      <div className="flex flex-col">
        <input
          name="newsletter"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-0.5 mb-8 lg:mb-4"
          id="newsletter"
          type="text"
          placeholder="Enter your E-mail address"
        />
        <button
          className="bg-secondary hover:bg-secondary-darker text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-0.5"
          type="button"
        >
          Subscribe
        </button>
      </div>
    </div>
  )
}

export default NewsletterSection