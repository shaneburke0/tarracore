import React, { useState, useEffect } from "react"
import { SiteContext } from "../context/mainContext"
import { FaShoppingCart, FaCircle } from "react-icons/fa"
import { Link } from "gatsby"
import { colors } from "../theme"
import LoginModal from "./LoginModal/LoginModal"
import { useAuthDispatch, useAuthState } from "../context/authContext"
import { signOut } from "../services/authService"
const { secondary } = colors

const NavActions = props => {
  let {
    context: { numberOfItemsInCart } = { numberOfItemsInCart: 0 },
    showCart = true,
  } = props
  const dispatch = useAuthDispatch()
  const { userToken } = useAuthState()
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)

  const handleSignOut = () => {
    signOut()
    dispatch({
      type: "SIGN_OUT",
    })
  }

  useEffect(() => {
    if (userToken) setLoginModalOpen(false)
  }, [userToken])

  return (
    <>
      <div className="flex flex-row z-10 items-center mobile:px-10 desktop:px-0 px-4 pt-6 pb-6">
        {userToken ? (
          <div
            role="button"
            tabIndex="0"
            className="text-white hover:text-gold pr-4 text-base mr-4 sm:mr-8 font-semibold nav-link"
            onClick={handleSignOut}
            onKeyDown={handleSignOut}
          >
            Sign Out
          </div>
        ) : (
          <div
            role="button"
            tabIndex="0"
            className="text-white hover:text-gold pr-4 text-base mr-4 sm:mr-8 font-semibold nav-link"
            onClick={() => setLoginModalOpen(true)}
            onKeyDown={() => setLoginModalOpen(true)}
          >
            Login / Register
          </div>
        )}

        {showCart && (
          <div className="flex flex-1 justify-end pr-4 relative">
            <Link to="/cart" className="nav-cart">
              <FaShoppingCart />
            </Link>
            {numberOfItemsInCart > Number(0) && (
              <div className="nav-cart--full">
                <FaCircle color={secondary} size={12} />
              </div>
            )}
          </div>
        )}
      </div>
      <LoginModal
        open={isLoginModalOpen}
        closeModal={() => setLoginModalOpen(false)}
      />
    </>
  )
}

function NavActionsWithContext(props) {
  return (
    <SiteContext.Consumer>
      {context => <NavActions {...props} context={context} />}
    </SiteContext.Consumer>
  )
}

export default NavActionsWithContext
