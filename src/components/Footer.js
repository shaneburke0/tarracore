import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ireMap from "../images/ire-map.png";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col lg:flex-row justify-evenly">
        <div className=" p-6 text-center flex-1">
          <img
            src={ireMap}
            alt="map"
            style={{ width: "400px", maxWidth: "95%", margin: "0 auto" }}
          />
        </div>
        <div className="p-6 text-center lg:text-left flex-1">
          <div>
            <h4>Useful Links</h4>
            <div className="text-xs flex flex-col align-start">
              <Link to="/terms-and-conditions" className="py-1 lg:py-0">
                Terms &amp; Conditions
              </Link>
              <Link to="/faqs" className="py-1 lg:py-0">
                FAQ
              </Link>
              <Link to="/privacy-policy" className="py-1 lg:py-0">
                Privacy Policy
              </Link>
              {/* <Link to="/terms-of-use" className="py-1 lg:py-0">
                Terms of Use
              </Link> */}
              <Link to="/competitions" className="py-1 lg:py-0">
                Competitions
              </Link>
              {/* <Link to="/contact-us" className="py-1 lg:py-0">
                Contact
              </Link> */}
            </div>
          </div>

          <div className="mt-8">
            <h4>Get In Touch</h4>
            <div className="flex my-2 justify-center lg:justify-start">
              <a
                className="flex items-center justify-center h-12 w-12 mx-2 ml-0 fas fill-current text-white text-2xl rounded-full"
                style={{ backgroundColor: "#3B5998" }}
                href="https://www.facebook.com/TarracoreIrl"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                className="flex items-center justify-center h-12 w-12 mx-2 fas fill-current text-white text-2xl rounded-full"
                style={{ backgroundColor: "#dd4b39" }}
                href="mailto:hello@tarracore.ie"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
              <a
                className="flex items-center justify-center h-12 w-12 mx-2 fas fill-current text-white text-2xl rounded-full"
                style={{ backgroundColor: "#125688" }}
                href="https://www.instagram.com/tarracore_irl/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
            <div className="text-xs my-4">
              <p>
                E-mail: hello@tarracore.ie <br />
                Company Registration Number: 689220
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <div className="px-8 block text-gray-100 pt-4 pb-8 mt-2 text-xs">
          Copyright © {new Date().getFullYear()} Tarracore Ltd. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
