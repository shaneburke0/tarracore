import React from "react"

import SEO from "../components/seo"

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <div className="mobile:px-10 px-4 pb-10 flex justify-center main-content">
      <div className="w-fw">
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </div>
    </div>
  </>
)

export default NotFoundPage
