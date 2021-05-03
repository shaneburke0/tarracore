module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-layout/gatsby-browser.js'),
      options: {"plugins":[],"component":"/Users/shaneburke/code/tarracore/src/layouts/baseLayout.js"},
    },{
      plugin: require('../node_modules/gatsby-plugin-web-font-loader/gatsby-browser.js'),
      options: {"plugins":[],"custom":{"families":["Eina, Eina-SemiBold"],"urls":["/fonts/fonts.css"]}},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"gatsby-starter-default","short_name":"starter","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui","icon":"src/images/icon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"66c62ca38f885d39070b877e7bbf157f"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
