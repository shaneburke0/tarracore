import React from "react"
import SEO from "../components/seo"
import NavActions from "../components/NavActions"

const CheckoutCompletePage = () => {
  return (
    <>
      <SEO title="Checkout Complete" />
      <NavActions />
      <div className="mobile:px-10 px-4 pb-10 flex justify-center main-content">
        <div className="w-fw">
          <div className="">
            <h1 className="text-5xl font-light mt-4">Checkout Complete</h1>
            <div className="max-w-fw flex">
              <p>
                Thank you for purchasing your tickets. Please check your emails
                for confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CheckoutCompletePage
