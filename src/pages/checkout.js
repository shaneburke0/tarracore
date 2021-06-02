import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import Popup from "reactjs-popup";
import addToMailchimp from "gatsby-plugin-mailchimp";
import SEO from "../components/seo";
import { SiteContext, ContextProviderComponent } from "../context/mainContext";
import { numberFormat } from "../../utils/helpers";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "gatsby";
import { TermsConditions } from "../components";
import { Auth } from "aws-amplify";
import shortid from "shortid";
import {
  fetchProfileDetails,
  createProfileDetails,
  updateProfileDetails,
} from "../services";
import config from "../aws-exports";

function CheckoutWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {(context) => <Checkout {...props} context={context} />}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  );
}

const Input = ({ onChange, value, name, placeholder }) => (
  <input
    onChange={onChange}
    value={value}
    className="mt-2 text-sm shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
    type="text"
    placeholder={placeholder}
    name={name}
  />
);

const Select = ({ onChange, value, name, placeholder }) => (
  <select
    onChange={onChange}
    placeholder={placeholder}
    name={name}
    value={value}
    className="mt-2 text-sm shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
  >
    <option value="" disabled>
      Select your country
    </option>
    <option value="GB">England</option>
    <option value="IE">Ireland</option>
    <option value="GB">Northern Ireland</option>
    <option value="GB">Scotland</option>
    <option value="GB">Wales</option>
  </select>
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
  const [orderId, setOrderId] = useState(null);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [postbackUrl, setPostbackUrl] = useState("");

  const [input, setInput] = useState({
    name: "",
    surname: "",
    email: "",
    street: "",
    city: "",
    postal_code: "",
    state: "",
    country: "",
    number: "",
  });

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [isPaymentLoaded, setPaymentLoaded] = useState(false);
  const [hasExistingProfile, setExistingProfile] = useState(false);
  const [existingProfileId, setExistingProfileId] = useState("");

  const handleGettingCurrentUser = async () => {
    const currentUser = await Auth.currentUserInfo();
    const userId = currentUser ? currentUser.attributes.email : "";
    setCurrentUserId(userId);

    const profile = await fetchProfileDetails(userId);

    if (profile) {
      setInput({
        name: profile.firstName,
        surname: profile.surname,
        email: profile.userId,
        street: profile.street,
        city: profile.city,
        postal_code: profile.postcode,
        state: profile.county,
        country: profile.country,
        number: profile.phone,
      });
      setExistingProfileId(profile.id);
      setExistingProfile(true);
    }
  };

  useEffect(() => {
    const oId = shortid.generate();
    setOrderId(oId);

    handleGettingCurrentUser();

    const found = config.aws_cloud_logic_custom.find(
      (item) => item.name === "checkout"
    );
    setPostbackUrl(`${found.endpoint}/checkout`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleSubmitDetails = async (ev) => {
    ev.preventDefault();

    const {
      email,
      street,
      city,
      postal_code,
      state,
      name,
      surname,
      country,
      number,
    } = input;
    const { total } = context;

    // Validate input
    if (
      !street ||
      !city ||
      !postal_code ||
      !state ||
      !name ||
      !surname ||
      !country ||
      !number
    ) {
      setErrorMessage("Please fill in the form!");
      return;
    }

    if (!isTermsAccepted) {
      setShowTermsErrorMessage(true);
      return;
    }

    setProcessing(true);
    setPaymentLoading(true);

    const items = [];

    if (Array.isArray(cart) && cart.length > 0) {
      cart.forEach((item) => [
        items.push({
          id: item.id,
          quantity: item.quantity,
          answer: item.answer,
        }),
      ]);
    }

    const params = {
      body: {
        items,
        orderId: orderId,
        details: {
          firstname: name,
          surname: surname,
          email,
          street,
          city,
          postal_code,
          state,
          countryIso: country,
          number,
          answer: items[0].answer,
        },
        total,
        email: currentUserId,
      },
    };

    // subscribe to email
    addToMailchimp(email);

    // Create PaymentIntent as soon as the page loads
    API.post("paymentsapi", "/paymentinit", params)
      .then((data) => {
        if (data && data.jwt) {
          setPaymentLoaded(true);
          const st = SecureTrading({
            jwt: data.jwt,
            formId: "st-form",
            buttonId: "paymentSubmitBtn",
            panIcon: true,
            translations: {
              "Expiration date": "Expiry Date",
              "Security code": "CVV",
            },
            styles: {
              "font-size-label": "18px",
              "background-color-input": "#ffffff", //	Set the input background colour.
              "border-radius-input": "0.25rem", //	Set the input border radius.
              "color-input": "#4a5568", //	Set the input colour.
              "font-size-input": "18px", //	Set the input font size.
              "line-height-input": "1.25", //	Set the input line height.
            },
            // liveStatus: 0,
          });
          st.Components();

          if (window.gtag) {
            window.gtag("event", "add_payment_info");
          }
        } else if (data && data.error) {
          setError(data.error);
        } else {
          setError(
            "There has been an issue connecting to payment provder. Please try again later."
          );
        }
      })
      .finally(() => {
        setPaymentLoading(false);
        handleUdateProfile();
      });
  };

  const handleUdateProfile = () => {
    const details = {
      id: existingProfileId,
      firstName: input.name,
      surname: input.surname,
      street: input.street,
      city: input.city,
      postcode: input.postal_code,
      county: input.state,
      country: input.country,
      phone: input.number,
      userId: currentUserId,
    };

    if (hasExistingProfile) {
      updateProfileDetails(details);
    } else {
      createProfileDetails(details);
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
              <div className="pt-10 pb-1 mb-4">
                <h1 className="text-5xl font-light">Checkout</h1>
                <Link to="/cart">
                  <div className="cursor-pointer flex">
                    <FaLongArrowAltLeft className="mr-2 text-gray-600 mt-1" />
                    <p className="text-gray-600 text-sm mb-0">Edit Cart</p>
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
                        {!isPaymentLoaded && (
                          <div>
                            {errorMessage ? (
                              <span className="text-red-700">
                                {errorMessage}
                              </span>
                            ) : (
                              ""
                            )}
                            <div className="flex">
                              <Input
                                onChange={onChange}
                                value={input.name}
                                name="name"
                                placeholder="First name"
                              />
                              <Input
                                onChange={onChange}
                                value={input.surname}
                                name="surname"
                                placeholder="Last name"
                              />
                            </div>
                            <Input
                              onChange={onChange}
                              value={input.email}
                              name="email"
                              placeholder="Email"
                            />
                            <Input
                              onChange={onChange}
                              value={input.number}
                              name="number"
                              placeholder="Phone"
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
                              placeholder="City / Town"
                            />
                            <Input
                              onChange={onChange}
                              value={input.state}
                              name="state"
                              placeholder="County / State"
                            />
                            <Select
                              onChange={onChange}
                              value={input.country}
                              name="country"
                              placeholder="Select Country"
                            />
                            <Input
                              onChange={onChange}
                              value={input.postal_code}
                              name="postal_code"
                              placeholder="Postal Code"
                            />
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
                                  Please read and accept the Terms &amp;
                                  Conditions to continue.
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
                                  processing ||
                                  succeeded ||
                                  error ||
                                  isPaymentLoading
                                }
                                onClick={handleSubmitDetails}
                                className="bg-secondary hover:bg-black text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline w-full md:w-60"
                              >
                                Continue to Payment
                              </button>
                            </div>
                          </div>
                        )}

                        {isPaymentLoaded && (
                          <>
                            <form
                              id="st-form"
                              action={postbackUrl}
                              method="POST"
                            >
                              <div
                                id="st-card-number"
                                className="card-input-field"
                              ></div>
                              <div
                                id="st-expiration-date"
                                className="card-input-field"
                              ></div>
                              <div
                                id="st-security-code"
                                className="card-input-field"
                              ></div>
                              <button
                                type="submit"
                                className="bg-secondary hover:bg-black text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline w-full md:w-60"
                                id="paymentSubmitBtn"
                                onClick={() => console.log("submitted")}
                              >
                                Pay
                              </button>
                            </form>
                            <div id="st-notification-frame"></div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="pt-4 flex-1 mt-4 md:mt-0">
                      <h2 className="ml-4 pl-2">Your Order</h2>
                      {cart.map((item, index) => {
                        return (
                          <>
                            <div
                              className="ml-4 pl-2 flex flex-1 justify-end pt-2 md:pt-8 pr-4"
                              key={item.id}
                            >
                              <span className="text-sm pr-10">{item.name}</span>
                              <span className="tracking-tighter w-24 flex justify-end">
                                x{item.quantity}
                              </span>
                            </div>
                            <div className="ml-4 pl-2 flex flex-1 justify-end pt-2 pr-4">
                              <p className="text-xs pr-10">Answer</p>
                              <p className="tracking-tighter w-24 flex justify-end text-xs">
                                {item.answer}
                              </p>
                            </div>
                          </>
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
                          {numberFormat(total)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isPaymentLoading && (
                <div className="loader-container-mask">
                  <div className="loader-container">
                    <div className="loader">Loading...</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutWithContext;
