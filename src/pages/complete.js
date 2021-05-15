import React, { useEffect, useState } from "react";
import * as queryString from "query-string";
import { SiteContext, ContextProviderComponent } from "../context/mainContext";
import SEO from "../components/seo";
import NavActions from "../components/NavActions";

const CheckoutCompletePage = ({ context }) => {
  const { clearCart } = context;
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState("Payment Failure");
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    const { code } = queryString.parse(window.location.search);
    if (code === "0") {
      setTitle("Checkout Complete");
      setSuccess(true);
      clearCart();
    }
    setLoading(false);
  }, []);

  return (
    <>
      <SEO title="Checkout Complete" />
      <NavActions />
      <div className="mobile:px-10 px-4 pb-10 flex justify-center main-content">
        <div className="w-fw">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="">
              <h1 className="text-5xl font-light mt-4">{title}</h1>
              <div className="max-w-fw">
                {isSuccess && (
                  <p>
                    Thank you for purchasing your tickets. Please check your
                    emails for confirmation.
                  </p>
                )}
                {!isSuccess && (
                  <>
                    <p>
                      There has been an issue with your payment. You have not
                      been charged. Please check your card details and try
                      again.
                    </p>
                    <p>
                      If you require any assistance, please let us know through
                      our by emailing us at{" "}
                      <a href="mailto:hello@tarracore.ie">hello@tarracore.ie</a>{" "}
                      or on{" "}
                      <a href="https://www.facebook.com/TarracoreIrl">
                        Facebook
                      </a>
                      .
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

function CompleteWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {(context) => <CheckoutCompletePage {...props} context={context} />}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  );
}

export default CompleteWithContext;
