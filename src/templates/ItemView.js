import React, { useEffect, useState } from "react";
import SEO from "../components/seo";
import Popup from "reactjs-popup";
import ImageGallery from "react-image-gallery";
import { navigate } from "gatsby";
import { SiteContext, ContextProviderComponent } from "../context/mainContext";
import CompetitionDetails from "../components/CompetitionDetails";
import Button from "../components/Button";
import QuantityPicker from "../components/QuantityPicker";
import CountdownTimer from "../components/CountdownTimer/CountdownTimer";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import Question from "../components/Question/Question";
import LoginModal from "../components/LoginModal/LoginModal";
import { numberFormat } from "../../utils/helpers";
import { /*useAuthDispatch,*/ useAuthState } from "../context/authContext";
import "react-image-gallery/styles/css/image-gallery.css";

import config from "../aws-exports";
import axios from "axios";
import tag from "graphql-tag";
const graphql = require("graphql");
const { print } = graphql;

const ItemView = (props) => {
  const item = props.pageContext.content;
  const {
    price,
    image,
    name,
    description,
    currentInventory,
    maxInventory,
    endDate,
    question,
    options,
    gallery,
    id,
    sold,
  } = item;

  const { userToken } = useAuthState();
  const [numberOfitems, updateNumberOfItems] = useState(1);
  const [showSelectAnswerError, setShowSelectAnswerError] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [images, setImages] = useState([]);
  const [currentInventoryState, setCurrentInventoryState] = useState(
    currentInventory
  );
  const [drawDate, setDrawDate] = useState(endDate);
  const [canBuyTickets, setCanBuyTickets] = useState(!sold);
  const [loginModalTriggered, setLoginModalTriggered] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const seo = props.pageContext.seo;

  const {
    context: { addToCart },
  } = props;

  function addItemToCart(item) {
    if (!selectedAnswer) {
      setShowSelectAnswerError(true);
      return;
    }

    if (!userToken) {
      setLoginModalTriggered(true);
      setLoginModalOpen(true);
      return;
    }

    item["quantity"] = numberOfitems;
    item["answer"] = selectedAnswer;
    addToCart(item);

    if (window.gtag) {
      window.gtag("event", "add_to_cart", {
        currency: "EUR",
        items: [
          {
            id: item.id,
            name: item.name,
            brand: item.brand,
            price: item.price,
            quantity: item.quantity,
          },
        ],
        value: item.price * item.quantity,
      });
    }

    navigate("/cart");
  }

  useEffect(() => {
    if (userToken) setLoginModalOpen(false);

    if (userToken && loginModalTriggered) addItemToCart(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  function increment() {
    if (numberOfitems === currentInventoryState) return;
    updateNumberOfItems(numberOfitems + 1);
  }

  function decrement() {
    if (numberOfitems === 1) return;
    updateNumberOfItems(numberOfitems - 1);
  }

  const handleQuestionChange = (value) => {
    setShowSelectAnswerError(false);
    setSelectedAnswer(value);
  };

  const contentStyle = { width: "90%" };

  const createDescriptionMarkup = () => {
    return {
      __html: description,
    };
  };

  const updateCanBuyTickets = (isProductSold, remainingTickets) => {
    const isProductGone = isProductSold || remainingTickets === 0;
    setCanBuyTickets(!isProductGone);
  };

  const createGallery = () => {
    const gall = [
      {
        original: image,
        thumbnail: image,
      },
    ];

    for (let i = 0; i < gallery.length; i++) {
      gall.push({
        original: gallery[i],
        thumbnail: gallery[i],
      });
    }

    setImages([...gall]);
  };

  const getProductDetails = async () => {
    const getProductQuery = tag(`
      query GetProduct($id: ID!) {
        getProduct(id: $id) {
          currentInventory
          endDate
          sold
        }
      }
  `);
    const gqlData = await axios({
      url: config.aws_appsync_graphqlEndpoint,
      method: "post",
      headers: {
        "x-api-key": window.TCORE_API_KEY,
      },
      data: {
        query: print(getProductQuery),
        variables: { id },
      },
    });

    if (gqlData && gqlData.status === 200) {
      setCurrentInventoryState(gqlData.data.data.getProduct.currentInventory);
      setDrawDate(gqlData.data.data.getProduct.endDate);

      updateCanBuyTickets(
        gqlData.data.data.getProduct.sold,
        gqlData.data.data.getProduct.currentInventory
      );
    }
  };

  const initGA = () => {
    if (window.gtag) {
      gtag("event", "view_item", {
        items: [
          {
            id: item.id,
            name: item.name,
            brand: item.brand,
            price: item.price,
            quantity: item.quantity,
          },
        ],
      });
    }
  };

  useEffect(() => {
    createGallery();

    getProductDetails();

    initGA();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SEO {...seo} />
      <div className="mobile:px-10 px-4 pb-10 flex justify-center main-content">
        <div className="w-fw">
          <h1 className="text-5xl font-light mb-0 mt-4">{name}</h1>
          <div
            className="py-4 flex flex-1 flex-col
      md:flex-row
      w-full
      my-0 mx-auto pt-0 items-start"
          >
            <div className="w-full md:w-1/2 h-auto flex flex-1">
              <div className="py-5 p10 flex flex-1 justify-center items-center">
                <div className="max-w-lg m-0 max-h-96 w-64 lg:w-full">
                  <Popup
                    modal
                    {...{ contentStyle }}
                    trigger={
                      <ImageGallery
                        items={images}
                        showPlayButton={false}
                        showFullscreenButton={false}
                      />
                    }
                  >
                    <ImageGallery items={images} showPlayButton={false} />
                  </Popup>
                </div>
              </div>
            </div>
            <div className="pt-2 px-0 md:px-10 pb-8 w-full lg:w-1/2">
              <CountdownTimer endDate={drawDate} />
              <div className="mb-6">
                <ProgressBar
                  currentInventory={currentInventoryState}
                  maxInventory={maxInventory}
                />
              </div>
              <div className="mb-6">
                <Question
                  question={question}
                  options={options}
                  selectedAnswer={selectedAnswer}
                  onChange={handleQuestionChange}
                  hasError={showSelectAnswerError}
                />
              </div>
              <div className="mb-6 flex flex-row items-baseline">
                {canBuyTickets && (
                  <div className="justify-self-start">
                    <QuantityPicker
                      increment={increment}
                      decrement={decrement}
                      numberOfitems={numberOfitems}
                    />
                  </div>
                )}
                <h2 className="text-xl tracking-tighter pl-8">
                  {numberFormat(price)}
                </h2>
              </div>
              <div>
                {showSelectAnswerError ? (
                  <p className="text-red-700">Please select an answer above.</p>
                ) : null}
              </div>
              {canBuyTickets ? (
                <Button
                  full
                  title="Add to Cart"
                  onClick={() => addItemToCart(item)}
                />
              ) : (
                <Button full title="Sold out" />
              )}
            </div>
          </div>
          <div
            className="py-4 flex flex-1 flex-col
      md:flex-row
      w-full
      my-0 mx-auto pt-0 items-start"
          >
            <div className="pt-2 px-0 md:px-10 pb-8 w-full lg:w-1/2">
              <div
                className="text-gray-600 text-m item-description"
                dangerouslySetInnerHTML={createDescriptionMarkup()}
              ></div>
            </div>
            <div className="pt-2 px-0 md:px-10 pb-8 w-full lg:w-1/2 text-gray-600 text-m">
              <CompetitionDetails
                currentInventory={currentInventoryState}
                maxInventory={maxInventory}
                endDate={drawDate}
              />
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

function ItemViewWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {(context) => <ItemView {...props} context={context} />}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  );
}

export default ItemViewWithContext;
