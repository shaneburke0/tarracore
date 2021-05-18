/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { Link } from "gatsby";
import { isMobile } from "react-device-detect";
import CookieConsent from "react-cookie-consent";
import { SiteContext, ContextProviderComponent } from "../context/mainContext";
import { AuthProvider } from "../context/authContext";
import { titleIfy, slugify } from "../../utils/helpers";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { PageFooter, NavActions } from "../components";
import { colors } from "../theme";

toast.configure({
  progressStyle: {
    background: colors.primary,
  },
});

const logo = require("../images/logo.svg");

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <AuthProvider>
        <ContextProviderComponent>
          <SiteContext.Consumer>
            {(context) => {
              let {
                navItems: {
                  navInfo: { data: links },
                },
              } = context;

              links = links.map((link) => ({
                name: titleIfy(link),
                link: slugify(link),
              }));
              links.unshift({
                name: "Home",
                link: "/",
              });
              links.push({
                name: "Previous Winners",
                link: "/previous-winners",
              });

              return (
                <div className="min-h-screen">
                  <nav className="header">
                    <div className="flex justify-between">
                      <div
                        className="
                    mobile:px-10 px-4 pt-6 pb-6
                    flex flex-col
                    sm:flex-row 
                    items-start sm:items-center"
                      >
                        <Link to="/">
                          <img
                            className="mb-0 w-40 mw-24 sm:w-48 sm:mr-16"
                            alt="Logo"
                            src={logo}
                            width="216"
                          />
                        </Link>
                        {!isMobile && (
                          <div className="flex flex-wrap mt-2">
                            {links.map((l, i) => (
                              <Link to={l.link} key={i}>
                                <span
                                  key={i}
                                  className="text-left m-0 text-base mr-4 sm:mr-8 font-semibold nav-link"
                                >
                                  {l.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                      <NavActions links={links} />
                    </div>
                  </nav>

                  <main>{children}</main>

                  <PageFooter />
                  <CookieConsent
                    location="bottom"
                    buttonText="Sure"
                    cookieName="cookieConsent"
                    style={{ background: "#2B373B" }}
                    buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                    expires={150}
                  >
                    This website uses cookies to enhance the user experience.
                  </CookieConsent>
                </div>
              );
            }}
          </SiteContext.Consumer>
        </ContextProviderComponent>
      </AuthProvider>
    );
  }
}

export default Layout;
