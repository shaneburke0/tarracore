import React, { useEffect, useState } from "react";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import { Auth } from "aws-amplify";
import { navigate } from "gatsby";
import { toast } from "react-toastify";
import SEO from "../components/seo";
import { signOut } from "../services/authService";
import { useAuthDispatch, useAuthState } from "../context/authContext";
import "react-web-tabs/dist/react-web-tabs.css";

import config from "../aws-exports";
import axios from "axios";
import tag from "graphql-tag";
const graphql = require("graphql");
const { print } = graphql;

const Input = ({ onChange, value, name, placeholder, disabled }) => (
  <input
    onChange={onChange}
    value={value}
    className="mt-2 text-sm shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
    type="text"
    placeholder={placeholder}
    name={name}
    disabled={disabled}
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

const MyAccountPage = (props) => {
  const {
    pageContext: { title },
  } = props;

  const [isInitialLoading, setInitialLoading] = useState(true);
  const [isAccountLoading, setAccountLoading] = useState(true);
  const [isOrdersLoading, setOrdersLoading] = useState(false);
  const [hasExistingProfile, setExistingProfile] = useState(false);
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
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

  const dispatch = useAuthDispatch();
  const { userToken } = useAuthState();

  const onChange = (e) => {
    setErrorMessage(null);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const getOrderDetails = async () => {
    setOrdersLoading(true);
    const currentUser = await Auth.currentUserInfo();
    const userId = currentUser ? currentUser.attributes.email : "";
    const getOrderQuery = tag(`
        query ListOrders(
            $userId: String!
            $limit: Int = 50
        ) {
            listOrders(filter: { userId: { ge: $userId } }, limit: $limit) {
                items {
                    id
                    product {
                        price
                        name
                        image
                    }
                    userId
                    quantity
                    orderRef
                    paymentRef
                    tickets
                    answer
                    email
                    address
                    orderDate
                }
            }
        }
    `);
    const gqlData = await axios({
      url: config.aws_appsync_graphqlEndpoint,
      method: "post",
      headers: {
        "x-api-key": "da2-mgfdzk6odvdb7hm5laltb7ai6q", // config.aws_appsync_apiKey,
      },
      data: {
        query: print(getOrderQuery),
        variables: { userId },
      },
    });

    if (gqlData && gqlData.status === 200) {
      console.log(gqlData.data.data);
      setOrders([...gqlData.data.data.listOrders.items]);
    }
    setOrdersLoading(false);
  };

  const getAccountDetails = async (userId) => {
    setAccountLoading(true);

    const getAccountQuery = tag(`
        query ListProfiles(
            $userId: String!
            $limit: Int = 1
        ) {
          listProfiles(filter: { userId: { ge: $userId } }, limit: $limit) {
                items {
                  id
                  firstName
                  surname
                  userId
                  county
                  country
                  street
                  city
                  state
                  postcode
                  phone
                  createdAt
                  updatedAt
                }
            }
        }
    `);
    const gqlData = await axios({
      url: config.aws_appsync_graphqlEndpoint,
      method: "post",
      headers: {
        "x-api-key": "da2-mgfdzk6odvdb7hm5laltb7ai6q", // config.aws_appsync_apiKey,
      },
      data: {
        query: print(getAccountQuery),
        variables: { userId },
      },
    });

    if (gqlData && gqlData.status === 200) {
      console.log(gqlData.data);
      try {
        if (
          gqlData.data.data.listProfiles.items &&
          gqlData.data.data.listProfiles.items.length > 0
        ) {
          setExistingProfile(true);
        }
      } catch (ex) {}
    }
    setAccountLoading(false);
  };

  const handleSignOut = () => {
    signOut();
    dispatch({
      type: "SIGN_OUT",
    });
    navigate("/");
  };

  const getUserDetails = async () => {
    const currentUser = await Auth.currentUserInfo();
    const userId = currentUser ? currentUser.attributes.email : "";
    const evt = {
      target: { name: "email", value: userId },
    };
    onChange(evt);
    getAccountDetails(userId);
  };

  useEffect(() => {
    if (userToken) {
      getUserDetails();
      setInitialLoading(false);
    } else {
      navigate("/");
    }
  }, [userToken]);

  const handleTabChange = async (tabId) => {
    if (tabId === "vertical-tab-two") {
      await getOrderDetails();
    }
  };

  const updateUserDetails = () => {
    console.log("Saving...");
    toast("Successfully saved details.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <SEO title={title} />
      <div className="mobile:px-10 px-4 pb-10 flex justify-center main-content">
        <div className="w-fw">
          <div className="">
            <h1 className="text-5xl font-light mt-4">{title}</h1>
            <div className="max-w-fw">
              {isInitialLoading ? (
                <div className="loader-container">
                  <div className="loader">Loading...</div>
                </div>
              ) : (
                <Tabs
                  defaultTab="vertical-tab-one"
                  vertical
                  onChange={(tabId) => handleTabChange(tabId)}
                >
                  <TabList className="">
                    <Tab tabFor="vertical-tab-one">My Details</Tab>
                    <Tab tabFor="vertical-tab-two">My Orders</Tab>
                    <div
                      role="button"
                      tabIndex="0"
                      className="rwt__tab"
                      onClick={handleSignOut}
                      onKeyDown={handleSignOut}
                    >
                      Sign Out
                    </div>
                  </TabList>
                  <TabPanel tabId="vertical-tab-one" className="w-full">
                    {isAccountLoading ? (
                      <div className="loader-container">
                        <div className="loader">Loading...</div>
                      </div>
                    ) : (
                      <div>
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
                          disabled={true}
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
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="bg-secondary hover:bg-black text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline w-full md:w-60"
                            onClick={updateUserDetails}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}{" "}
                  </TabPanel>
                  <TabPanel tabId="vertical-tab-two" className="w-full">
                    {isOrdersLoading ? (
                      <div className="loader-container">
                        <div className="loader">Loading...</div>
                      </div>
                    ) : Array.isArray(orders) && orders.length > 0 ? (
                      <div className="">
                        <div className="flex justify-between">
                          <div className="min-w-150">Order Id</div>
                          <div className="min-w-150">Date</div>
                          <div className="flex-grow">Name</div>
                          <div className="min-w-80">Quantity</div>
                          <div className="min-w-80">Price</div>
                          <div className="min-w-80">Tickets</div>
                        </div>

                        {orders &&
                          orders.map((order, i) => (
                            <div className="flex justify-between" key={i}>
                              <div className="min-w-150">{order.orderRef}</div>
                              <div className="min-w-150">{order.orderDate}</div>
                              <div className="flex-grow">
                                {order.product.name}
                              </div>
                              <div className="min-w-80">{order.quantity}</div>
                              <div className="min-w-80">
                                {order.product.price}
                              </div>
                              <div className="min-w-80">
                                {order.tickets.join(", ")}
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p>No orders to display.</p>
                    )}
                  </TabPanel>
                  <TabPanel tabId="vertical-tab-three">
                    <p>Tab 3 content</p>
                  </TabPanel>
                </Tabs>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccountPage;
