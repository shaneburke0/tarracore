/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { Link } from "gatsby";
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
                      </div>
                      <NavActions />
                    </div>
                  </nav>

                  <main>{children}</main>

                  <PageFooter />
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
