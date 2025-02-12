module.exports = {
  siteMetadata: {
    title: `Tarracore`,
    description: `Ireland's newest Tractor & Plant machinery competitions website.`,
    author: `@tarracore`,
    siteUrl: process.env.siteUrl || `https://tarracore.ie`,
    image: "https://tarracore.ie/images/tarracore-share.png",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/baseLayout.js`),
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Eina, Eina-SemiBold"],
          urls: ["/fonts/fonts.css"],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tarracore`,
        short_name: `tarracore`,
        start_url: `/`,
        lang: `en`,
        background_color: `#60994a`,
        theme_color: `#60994a`,
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-load-script",
      options: {
        src: "https://webservices.securetrading.net/js/v3/st.js",
        // crossorigin: "anonymous",
      },
    },
    {
      resolve: "gatsby-plugin-load-script",
      options: {
        src: "/scripts/env.js",
      },
    },
    {
      resolve: "gatsby-plugin-load-script",
      options: {
        src: "/scripts/trustpilot.js",
      },
    },
    {
      resolve: "gatsby-plugin-load-script",
      options: {
        src: "//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js",
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://tarracore.us6.list-manage.com/subscribe/post?u=286c652fab3194b070105038e&amp;id=bb5a1a32a1", // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-QGKKZZV3E8", // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          //   optimize_id: "OPT_CONTAINER_ID",
          //   anonymize_ip: true,
          cookie_expires: 63072000,
          send_page_view: true,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: false,
          // Avoids sending pageview hits from custom paths
          exclude: [],
        },
      },
    },
    `gatsby-plugin-sitemap`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-no-sourcemaps",
    },
  ],
};
