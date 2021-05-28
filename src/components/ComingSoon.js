import React from "react";
import NewsletterSection from "./NewsletterSection";

const ComingSoonPage = () => (
  <div className="flex items-center justify-center p-8 bg-gray-200">
    <div className="container">
      <div className="bg-white rounded-lg shadow-lg p-5 md:p-20 mx-2">
        <div className="text-center">
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
            Coming Soon
          </h2>
          <p className="text-md md:text-xl mt-10">
            We're busy getting our latest competiton ready for you.
            <br /> We'll be launching our next competition in the next few days.{" "}
            <br />
            Be sure to Subscribe to our Newsletter below to be notified.
          </p>
        </div>
        <div className="flex flex-wrap mt-10 justify-center">
          <NewsletterSection
            showText={false}
            inputStyle={{ width: "600px", maxWidth: "90%" }}
          />
        </div>
        <div className="flex flex-wrap mt-10 justify-center">
          <div className="m-3">
            <a
              href="https://www.facebook.com/TarracoreIrl"
              title="Tarracore On Facebook"
              className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-blue-600 hover:border-blue-600 hover:bg-blue-600 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
              target="_blank"
            >
              <span className="mx-auto">Facebook</span>
            </a>
          </div>
          <div className="m-3">
            <a
              href="mailto:hello@tarracore.ie"
              title="Tarracore On Email"
              className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
            >
              <span className="mx-auto">Email</span>
            </a>
          </div>
          <div className="m-3">
            <a
              href="https://instagram.com/"
              title="Tarracore On Instagram"
              className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-orange-500 hover:border-orange-500 hover:bg-orange-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
              target="_blank"
            >
              <span className="mx-auto">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ComingSoonPage;
