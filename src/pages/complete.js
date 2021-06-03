import React, { useEffect, useState } from "react";
import * as queryString from "query-string";
import { SiteContext, ContextProviderComponent } from "../context/mainContext";
import SEO from "../components/seo";
import NavActions from "../components/NavActions";

const CheckoutCompletePage = ({ context }) => {
  const { cart, clearCart } = context;
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState("Checkout Complete");
  const [isSuccess, setSuccess] = useState(true);
  const [paymentRef, setPaymentRef] = useState(null);

  const initGA = (purchasedCart, ref) => {
    if (window.gtag) {
      let total = 0;
      const items = [];

      purchasedCart.forEach((item) => {
        items.push({
          id: item.id,
          name: item.name,
          brand: item.brand,
          price: item.price,
          quantity: item.quantity,
        });
        total += item.price * item.quantity;
      });

      window.gtag("event", "purchase", {
        currency: "EUR",
        transaction_id: ref,
        value: total,
        items,
      });
    }
  };

  useEffect(() => {
    const { code, ref } = queryString.parse(window.location.search);

    setPaymentRef(ref);

    if (code === "0") {
      setTitle("Checkout Complete");
      setSuccess(true);

      initGA(cart, ref);
      clearCart();
    } else {
      setTitle("Payment Failure");
      setSuccess(false);
    }
    setLoading(false);
  }, []);

  return (
    <>
      <SEO title="Checkout Complete" />
      <div className="mobile:px-10 px-4 pb-10 flex justify-center main-content">
        <div className="w-fw">
          {isLoading ? (
            <div className="loader-container">
              <div className="loader">Loading...</div>
            </div>
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
                {paymentRef && <p>Payment Reference: {paymentRef}</p>}
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
