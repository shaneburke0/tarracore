import React, { useEffect, useState } from "react";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import { Auth } from "aws-amplify";
import { navigate } from "gatsby";
import { toast } from "react-toastify";
import SEO from "../components/seo";
import { signOut } from "../services/authService";
import { useAuthDispatch, useAuthState } from "../context/authContext";
import {
  fetchProfileDetails,
  fetchOrderDetails,
  createProfileDetails,
  updateProfileDetails,
} from "../services";
import "react-web-tabs/dist/react-web-tabs.css";

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

  const [currentUserId, setCurrentUserId] = useState("");
  const [isInitialLoading, setInitialLoading] = useState(true);
  const [isAccountLoading, setAccountLoading] = useState(true);
  const [isOrdersLoading, setOrdersLoading] = useState(false);
  const [hasExistingProfile, setExistingProfile] = useState(false);
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [input, setInput] = useState({
    id: "",
    firstName: "",
    surname: "",
    email: "",
    street: "",
    city: "",
    postcode: "",
    county: "",
    country: "",
    phone: "",
  });

  const dispatch = useAuthDispatch();
  const { userToken } = useAuthState();

  const onChange = (e) => {
    setErrorMessage(null);
    setInput({ ...input, [e.target.name]: e.target.value });
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
    setCurrentUserId(userId);
    const evt = {
      target: { name: "email", value: userId },
    };
    onChange(evt);
    setAccountLoading(true);
    const profile = await fetchProfileDetails(userId);

    setInput(profile);
    setExistingProfile(profile ? true : false);
    setAccountLoading(false);
  };

  const getOrderDetails = async () => {
    const currentUser = await Auth.currentUserInfo();
    const userId = currentUser ? currentUser.attributes.email : "";
    setOrdersLoading(true);
    const orderDetails = await fetchOrderDetails(userId);
    setOrders([...orderDetails]);
    setOrdersLoading(false);
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
      getOrderDetails();
    }
  };

  const updateUserDetails = async () => {
    let userSaved = false;
    setAccountLoading(true);

    const details = {
      ...input,
      userId: currentUserId,
    };
    if (hasExistingProfile) {
      userSaved = await updateProfileDetails(details);
    } else {
      userSaved = await createProfileDetails(details);
    }

    if (userSaved) {
      toast("Successfully saved details.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setAccountLoading(false);
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
                            value={input.firstName}
                            name="firstName"
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
                          value={input.userId}
                          name="email"
                          placeholder="Email"
                          disabled={true}
                        />
                        <Input
                          onChange={onChange}
                          value={input.phone}
                          name="phone"
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
                          value={input.county}
                          name="county"
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
                          value={input.postcode}
                          name="postcode"
                          placeholder="Postcode"
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
