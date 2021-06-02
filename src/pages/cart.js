import React, { useState, useEffect } from "react";
import SEO from "../components/seo";
import { SiteContext, ContextProviderComponent } from "../context/mainContext";
import { FaTimes } from "react-icons/fa";
import { Link, navigate } from "gatsby";
import Button from "../components/Button";
import LoginModal from "../components/LoginModal/LoginModal";
import { useAuthState } from "../context/authContext";
import QuantityPicker from "../components/QuantityPicker";
import { slugify, numberFormat } from "../../utils/helpers";
import Image from "../components/Image";

const Cart = ({ context }) => {
  const {
    numberOfItemsInCart,
    cart,
    removeFromCart,
    total,
    setItemQuantity,
  } = context;
  const cartEmpty = numberOfItemsInCart === Number(0);

  const { userToken } = useAuthState();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    if (userToken) setLoginModalOpen(false);
  }, [userToken]);

  function increment(item) {
    item.quantity = item.quantity + 1;
    setItemQuantity(item);
  }

  function decrement(item) {
    if (item.quantity === 1) return;
    item.quantity = item.quantity - 1;
    setItemQuantity(item);
  }

  function checkout() {
    if (!userToken) {
      setLoginModalOpen(true);
      return;
    }

    if (window.gtag) {
      let total = 0;
      const items = [];

      cart.forEach((item) => {
        items.push({
          id: item.id,
          name: item.name,
          brand: item.brand,
          price: item.price,
          quantity: item.quantity,
        });
        total += item.price * item.quantity;
      });

      window.gtag("event", "begin_checkout", {
        value: total,
        currency: "EUR",
        items,
      });
    }

    navigate("/checkout");
  }

  return (
    <>
      <SEO title="Cart" />
      <div className="mobile:px-10 px-4 pb-10 flex justify-center main-content">
        <div className="w-fw">
          <div className="flex flex-col items-center pb-10">
            <div
              className="
          flex flex-col w-full
          c_large:w-c_large
        "
            >
              <div className="pt-10 pb-8">
                <h1 className="text-5xl font-light">Your Cart</h1>
              </div>

              {cartEmpty ? (
                <div>
                  <h3>No items in cart.</h3>
                  <Link to="/competitions" className="text-green-700">
                    Click here to find a competition
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="">
                    {cart.map((item) => {
                      return (
                        <div className="border-b py-10" key={item.id}>
                          {/* Responsive - Desktop */}
                          <div className="flex items-center hidden md:flex">
                            <Link to={slugify(item.name)}>
                              <Image
                                className="w-32 m-0"
                                src={item.image}
                                alt={item.name}
                              />
                            </Link>
                            <Link to={slugify(item.name)}>
                              <p
                                className="
                              m-0 pl-10 text-gray-600 text-sm w-56
                              "
                              >
                                {item.name}
                              </p>
                            </Link>
                            <div className="ml-4">
                              <QuantityPicker
                                numberOfitems={item.quantity}
                                increment={() => increment(item)}
                                decrement={() => decrement(item)}
                              />
                            </div>
                            <div className="ml-4 text-center">
                              <span className="text-gray-600 text-sm">
                                Answer: {item.answer}
                              </span>
                            </div>
                            <div className="flex flex-1 justify-end">
                              <p className="m-0 pl-10 text-gray-900 tracking-tighter font-semibold">
                                {numberFormat(item.price)}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item)}
                              className="
                            m-0 ml-10 text-gray-900 text-s cursor-pointer
                            "
                            >
                              <FaTimes />
                            </button>
                          </div>

                          {/* Responsive - Mobile */}
                          <div className="flex items-center flex md:hidden">
                            <Link to={slugify(item.name)}>
                              <Image
                                className="w-32 m-0"
                                src={item.image}
                                alt={item.name}
                              />
                            </Link>
                            <div>
                              <Link to={slugify(item.name)}>
                                <p
                                  className="
                                m-0 pl-6 text-gray-600 text-base
                                "
                                >
                                  {item.name}
                                </p>
                              </Link>
                              <div className="ml-6 mt-4 mb-2">
                                <QuantityPicker
                                  hideQuantityLabel
                                  numberOfitems={item.quantity}
                                  increment={() => increment(item)}
                                  decrement={() => decrement(item)}
                                />
                              </div>
                              <div className="ml-6 mt-4 mb-2">
                                <span className="text-gray-600 text-sm">
                                  Answer: {item.answer}
                                </span>
                              </div>
                              <div className="flex flex-1">
                                <p className="text-lg m-0 pl-6 pt-4 text-gray-900 tracking-tighter font-semibold">
                                  {numberFormat(item.price)}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item)}
                              className="
                            m-0 ml-4 text-gray-900 text-s cursor-pointer mr-2
                            "
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="flex flex-1 justify-end py-8">
                <p className="text-sm pr-10">Total</p>
                <p className="font-semibold tracking-tighter">
                  {numberFormat(total)}
                </p>
              </div>
              {!cartEmpty && (
                <div className="flex flex-1 justify-end">
                  <Button
                    title="Checkout"
                    onClick={() => checkout()}
                    customClasses="w-full md:w-6/12"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <LoginModal
        open={isLoginModalOpen}
        closeModal={() => setLoginModalOpen(false)}
      />
    </>
  );
};

function CartWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {(context) => <Cart {...props} context={context} />}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  );
}

export default CartWithContext;
