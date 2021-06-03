import React, { useState, useEffect, useContext } from "react";
import { isMobile } from "react-device-detect";
import { slide as Menu } from "react-burger-menu";
import { SiteContext } from "../context/mainContext";
import { FaShoppingCart, FaCircle, FaUserAlt } from "react-icons/fa";
import { Link, navigate } from "gatsby";
import { colors } from "../theme";
import LoginModal from "./LoginModal/LoginModal";
import { useAuthDispatch, useAuthState } from "../context/authContext";
import { signOut } from "../services/authService";
const { secondary } = colors;

const styles = {
  bmBurgerButton: {
    position: "relative",
    width: "26px",
    height: "25px",
  },
  bmBurgerBars: {
    background: "#ffffff",
    opacity: 1,
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    top: 0,
  },
  bmMenu: {
    background: "#161c20",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmItem: {
    display: "block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

// make a new context
const MyContext = React.createContext();

// create the provider
const MyProvider = (props) => {
  const [menuOpenState, setMenuOpenState] = useState(false);

  return (
    <MyContext.Provider
      value={{
        isMenuOpen: menuOpenState,
        toggleMenu: () => setMenuOpenState(!menuOpenState),
        stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen),
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

const NavActions = (props) => {
  let {
    context: { numberOfItemsInCart } = { numberOfItemsInCart: 0 },
    showCart = true,
    links = [],
  } = props;

  const dispatch = useAuthDispatch();
  const { userToken } = useAuthState();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const ctx = useContext(MyContext);

  const handleSignOut = () => {
    ctx.toggleMenu();
    signOut();
    dispatch({
      type: "SIGN_OUT",
    });
    navigate("/");
  };

  const handleSignupModelClick = (state) => {
    ctx.toggleMenu();
    setLoginModalOpen(state);
  };

  useEffect(() => {
    if (userToken) setLoginModalOpen(false);
  }, [userToken]);

  return (
    <>
      <div className="flex flex-row z-10 items-center mobile:px-10 desktop:px-0 px-4 pt-6 pb-6">
        {userToken ? (
          <Link to="/my-account" className="mr-6 text-2xl text-white">
            <FaUserAlt />
          </Link>
        ) : (
          <div
            role="button"
            tabIndex="0"
            className="text-white hover:text-gold pr-4 text-base mr-4 sm:mr-8 font-semibold nav-link text-2xl"
            onClick={() => setLoginModalOpen(true)}
            onKeyDown={() => setLoginModalOpen(true)}
          >
            <FaUserAlt />
          </div>
        )}

        {showCart && (
          <div className="flex flex-1 justify-end pr-4 relative">
            <Link to="/cart" className="nav-cart text-2xl">
              <FaShoppingCart />
            </Link>
            {numberOfItemsInCart > Number(0) && (
              <div className="nav-cart--full">
                <FaCircle color={secondary} size={12} />
              </div>
            )}
          </div>
        )}
        {isMobile && (
          <Menu
            styles={styles}
            right
            isOpen={ctx.isMenuOpen}
            onStateChange={(state) => ctx.stateChangeHandler(state)}
          >
            {links.map((l, i) => (
              <Link to={l.link} key={i} className="block mb-3 text-lg">
                <span
                  key={i}
                  className="text-left m-0 text-base mr-4 sm:mr-8 font-semibold nav-link"
                  onClick={ctx.toggleMenu}
                >
                  {l.name}
                </span>
              </Link>
            ))}
            <Link to="/my-account" className="block mb-3 text-lg">
              <span
                className="text-left m-0 text-base mr-4 sm:mr-8 font-semibold nav-link"
                onClick={ctx.toggleMenu}
              >
                My Account
              </span>
            </Link>
            <Link to="/cart" className="block mb-3 text-lg">
              <span
                className="text-left m-0 text-base mr-4 sm:mr-8 font-semibold nav-link"
                onClick={ctx.toggleMenu}
              >
                Cart
              </span>
            </Link>
            <Link to="/terms-and-conditions" className="block mb-3 text-lg">
              <span
                className="text-left m-0 text-base mr-4 sm:mr-8 font-semibold nav-link"
                onClick={ctx.toggleMenu}
              >
                Terms &amp; Conditions
              </span>
            </Link>
            <Link to="/faqs" className="block mb-3 text-lg">
              <span
                className="text-left m-0 text-base mr-4 sm:mr-8 font-semibold nav-link"
                onClick={ctx.toggleMenu}
              >
                FAQ
              </span>
            </Link>
            <Link to="/privacy-policy" className="block mb-3 text-lg">
              <span
                className="text-left m-0 text-base mr-4 sm:mr-8 font-semibold nav-link"
                onClick={ctx.toggleMenu}
              >
                Privacy Policy
              </span>
            </Link>
            {!userToken && (
              <div
                role="button"
                tabIndex="0"
                className="text-white hover:text-gold pr-4 text-base mr-4 sm:mr-8 font-semibold nav-link mb-3"
                onClick={() => handleSignupModelClick(true)}
                onKeyDown={() => handleSignupModelClick(true)}
              >
                Login
              </div>
            )}
            {!userToken && (
              <div
                role="button"
                tabIndex="0"
                className="text-white hover:text-gold pr-4 text-base mr-4 sm:mr-8 font-semibold nav-link mb-3"
                onClick={() => handleSignupModelClick(true)}
                onKeyDown={() => handleSignupModelClick(true)}
              >
                Sign up
              </div>
            )}

            {userToken && (
              <div
                role="button"
                tabIndex="0"
                className="text-white hover:text-gold pr-4 text-base mr-4 sm:mr-8 font-semibold nav-link"
                onClick={handleSignOut}
                onKeyDown={handleSignOut}
              >
                Sign Out
              </div>
            )}
          </Menu>
        )}
      </div>
      <LoginModal
        open={isLoginModalOpen}
        closeModal={() => setLoginModalOpen(false)}
      />
    </>
  );
};

function NavActionsWithContext(props) {
  return (
    <SiteContext.Consumer>
      {(context) => (
        <MyProvider>
          <NavActions {...props} context={context} />
        </MyProvider>
      )}
    </SiteContext.Consumer>
  );
}

export default NavActionsWithContext;
