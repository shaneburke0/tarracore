import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import Popup from "reactjs-popup";
import SEO from "../components/seo";
import { SiteContext, ContextProviderComponent } from "../context/mainContext";
import { numberFormat } from "../../utils/helpers";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link, navigate } from "gatsby";
import uuid from "uuid/v4";
import { TermsConditions } from "../components";
import moment from "moment";
import { Auth } from "aws-amplify";

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51IRN3MAefCJ43eZzieeGe9rfdkKQCdvLdftt6SaXdpAJBHUbOANDAzG8X4l0jK1toQiqe8Fjs6nn9fdamIFpSRB400RU5MYot3"
);

function CheckoutWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {(context) => (
          <Elements stripe={stripePromise}>
            <Checkout {...props} context={context} />
          </Elements>
        )}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  );
}

const calculateShipping = () => {
  return 0;
};

const Input = ({ onChange, value, name, placeholder }) => (
  <input
    onChange={onChange}
    value={value}
    className="mt-2 text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    type="text"
    placeholder={placeholder}
    name={name}
  />
);

const Checkbox = ({ onChange, name, checked }) => (
  <input
    type="checkbox"
    onChange={onChange}
    id={name}
    name={name}
    checked={checked}
  />
);

const Checkout = ({ context, history }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showTermsErrorMessage, setShowTermsErrorMessage] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isTermsAccepted, setTermsAccepted] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  // const [orderCompleted, setOrderCompleted] = useState(false)
  const [input, setInput] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    postal_code: "",
    state: "",
  });

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const handleGettingCurrentUser = async () => {
    const currentUser = await Auth.currentUserInfo();
    setCurrentUserId(currentUser ? currentUser.attributes.email : "");
  };

  useEffect(() => {
    // const st = SecureTrading({
    //   jwt:
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFjY291bnR0eXBlZGVzY3JpcHRpb24iOiJFQ09NIiwiYmFzZWFtb3VudCI6IjEwNTAiLCJjdXJyZW5jeWlzbzNhIjoiR0JQIiwic2l0ZXJlZmVyZW5jZSI6InRlc3Rfc2l0ZTEyMzQ1IiwicmVxdWVzdHR5cGVkZXNjcmlwdGlvbnMiOlsiVEhSRUVEUVVFUlkiLCJBVVRIIl19LCJpYXQiOjE1NTkwMzM4NDksImlzcyI6Imp3dC51c2VyIn0.4LR3bv1YPOy1E13OwJGRxuyA7j91P7RUTnolVR2FAS4",
    //   liveStatus: 0,
    // });
    // st.Components();

    const { cart } = context;
    const items = [];

    console.log("cart", cart);

    if (Array.isArray(cart) && cart.length > 0) {
      cart.forEach((item) => [
        items.push({
          id: item.id,
          quantity: item.quantity,
        }),
      ]);
    }

    const params = {
      body: {
        items,
      },
    };

    // Create PaymentIntent as soon as the page loads
    API.post("paymentsapi", "/paymentinit", params).then((data) => {
      if (data && data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else if (data && data.error) {
        setError(data.error);
      } else {
        setError(
          "There has been an issue connecting to payment provder. Please try again later."
        );
      }
    });

    handleGettingCurrentUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paymentComplete = (paymentRef) => {
    const { cart, clearCart } = context;

    const items = [];

    if (Array.isArray(cart) && cart.length > 0) {
      cart.forEach((item) => [
        items.push({
          id: item.id,
          quantity: item.quantity,
          answer: item.answer,
          name: item.name,
          price: item.price,
        }),
      ]);
    }

    const address = `${input.street}, ${input.city}, ${input.state}, ${input.postal_code}`;

    const params = {
      body: {
        order: {
          address: address,
          answer: items[0].answer,
          email: input.email,
          orderDate: moment(),
          orderProductId: items[0].id,
          paymentRef: paymentRef,
          quantity: items[0].quantity,
          userId: currentUserId,
          county: input.state,
          cart: {
            items: [...cart],
            total: items[0].price * items[0].quantity,
            name: input.name,
            orderid: paymentRef,
            date: moment().format("L"),
          },
        },
      },
    };

    API.post("paymentsapi", "/paymentcomplete", params).then((data) => {
      setProcessing(false);
      setSucceeded(true);
      clearCart();
      navigate("/complete");
    });
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
    setShowTermsErrorMessage(false);
  };

  const onChange = (e) => {
    setErrorMessage(null);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleShowTerms = (e) => {
    e.preventDefault();
    setShowTerms(!showTerms);
  };

  const { numberOfItemsInCart, cart, total } = context;
  const cartEmpty = numberOfItemsInCart === Number(0);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const { email, street, city, postal_code, state } = input;
    const { total } = context;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Validate input
    if (!street || !city || !postal_code || !state) {
      setErrorMessage("Please fill in the form!");
      return;
    }

    if (!isTermsAccepted) {
      setShowTermsErrorMessage(true);
      return;
    }

    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);

      const order = {
        email,
        amount: total,
        address: state,
        receipt_email: email,
        id: uuid(),
      };
      paymentComplete(order.id);
    }
  };

  const contentStyle = { width: "90%", height: "67%" };

  return (
    <>
      <SEO title="Checkout" />
      <div className="mobile:px-10 px-4 pb-10 flex justify-center main-content">
        <div className="w-fw">
          <div className="flex flex-col items-center pb-10">
            <div
              className="
            flex flex-col w-full
            c_large:w-c_large
          "
            >
              <div className="pt-10 pb-1">
                <h1 className="text-5xl font-light">Checkout</h1>
                <Link to="/cart">
                  <div className="cursor-pointer flex">
                    <FaLongArrowAltLeft className="mr-2 text-gray-600 mt-1" />
                    <p className="text-gray-600 text-sm">Edit Cart</p>
                  </div>
                </Link>
              </div>

              {cartEmpty ? (
                <h3>No items in cart.</h3>
              ) : (
                <div className="flex flex-col lg:flex-row">
                  <div className="flex flex-1 flex-col md:flex-row">
                    <div className="flex flex-1 pt-0 flex-col">
                      <div className="mt-4 max-w-2xl">
                        <h2>Billing Details</h2>
                        <form onSubmit={handleSubmit}>
                          {errorMessage ? (
                            <span className="text-red-700">{errorMessage}</span>
                          ) : (
                            ""
                          )}
                          <Input
                            onChange={onChange}
                            value={input.name}
                            name="name"
                            placeholder="Cardholder name"
                          />
                          <CardElement
                            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            options={cardStyle}
                            onChange={handleChange}
                          />
                          <Input
                            onChange={onChange}
                            value={input.email}
                            name="email"
                            placeholder="Email"
                          />
                          <Input
                            onChange={onChange}
                            value={input.street}
                            name="street"
                            placeholder="Street"
                          />
                          <Input
                            onChange={onChange}
                            value={input.city}
                            name="city"
                            placeholder="City"
                          />
                          <Input
                            onChange={onChange}
                            value={input.state}
                            name="state"
                            placeholder="State"
                          />
                          <Input
                            onChange={onChange}
                            value={input.postal_code}
                            name="postal_code"
                            placeholder="Postal Code"
                          />
                        </form>

                        {/* <div id="st-notification-frame"></div>
                        <form
                          id="st-form"
                          action="https://tarracore.ie"
                          method="POST"
                        >
                          <div id="st-card-number"></div>
                          <div id="st-expiration-date"></div>
                          <div id="st-security-code"></div>
                          <button type="submit">Pay securely</button>
                        </form> */}
                      </div>
                    </div>
                    <div className="md:pt-4 flex-1">
                      <h2 className="ml-4 pl-2">Your Order</h2>
                      {cart.map((item, index) => {
                        return (
                          <div
                            className="ml-4 pl-2 flex flex-1 justify-end pt-2 md:pt-8 pr-4"
                            key={item.id}
                          >
                            <span className="text-sm pr-10">{item.name}</span>
                            <span className="tracking-tighter w-24 flex justify-end">
                              x{item.quantity}
                            </span>
                          </div>
                        );
                      })}

                      <div className="ml-4 pl-2 flex flex-1 justify-end pt-2 pr-4">
                        <p className="text-sm pr-10">Subtotal</p>
                        <p className="tracking-tighter w-24 flex justify-end">
                          {numberFormat(total)}
                        </p>
                      </div>
                      <div className="md:ml-4 pl-2 flex flex-1 justify-end bg-gray-200 pr-4 pt-6">
                        <p className="text-sm pr-10">Total</p>
                        <p className="font-semibold tracking-tighter w-24 flex justify-end">
                          {numberFormat(total + calculateShipping())}
                        </p>
                      </div>
                      <Popup
                        open={showTerms}
                        closeOnDocumentClick
                        onClose={() => setShowTerms(false)}
                        modal
                        {...{ contentStyle }}
                      >
                        <div className="text-left p-4 mb-4 h-4/6 overflow-auto">
                          <span
                            role="button"
                            tabIndex="0"
                            className="modal-close"
                            onClick={() => setShowTerms(false)}
                            onKeyDown={() => setShowTerms(false)}
                          >
                            &times;
                          </span>
                          <TermsConditions />
                        </div>
                      </Popup>
                      <div className="my-3 ml-4 pl-2 text-right">
                        <Checkbox
                          name="terms"
                          onChange={handleTermsChange}
                          checked={isTermsAccepted}
                        />
                        <label htmlFor="terms">
                          {" "}
                          I have read and agree to the website{" "}
                          <span
                            role="button"
                            tabIndex="0"
                            className="text-green-800 hover:text-gray-700 hover:underline"
                            onClick={handleShowTerms}
                            onKeyDown={handleShowTerms}
                          >
                            terms and conditions
                          </span>{" "}
                          *
                        </label>
                        {showTermsErrorMessage ? (
                          <div className="text-red-700 text-sm">
                            Please read and accept the terms and conditions to
                            place your order.
                          </div>
                        ) : null}
                      </div>
                      {/* Show any error that happens when processing the payment */}
                      {error && (
                        <div
                          className="card-error text-red-700 flex flex-1 justify-end"
                          role="alert"
                        >
                          {error}
                        </div>
                      )}
                      <div className="flex flex-1 justify-end">
                        <button
                          type="submit"
                          disabled={
                            processing || disabled || succeeded || error
                          }
                          onClick={handleSubmit}
                          className="bg-secondary hover:bg-black text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline w-full md:w-60"
                        >
                          Confirm order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Show a success message upon completion */}
              <p
                className={
                  succeeded ? "result-message" : "result-message hidden"
                }
              >
                Payment succeeded, see the result in your
                <a href={`https://dashboard.stripe.com/test/payments`}>
                  {" "}
                  Stripe dashboard.
                </a>{" "}
                Refresh the page to pay again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutWithContext;
