const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `Tabi Traveler`,
    description: `Tabi Traveler photography, portfolio, blog and store`,
    author: `Ross Neilson`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `content`, `images`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tabi Traveler - Photography`,
        short_name: `Tabi Traveler`,
        start_url: `/`,
        background_color: `#2096f3c7`,
        theme_color: `#2096f3c7`,
        display: `standalone`,
        icon: `static/icon-512x512.png`,
        cache_busting_mode: "none",
      },
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`en`, `jp`],
        defaultLanguage: `en`,
        redirect: true,
      },
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography.js",
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-139306598-2",
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // gatsby-remark-relative-images must
          // go before gatsby-remark-images
          {
            resolve: `gatsby-remark-relative-images`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1000,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-webpack-bundle-analyzer",
      options: {
        analyzerPort: 3000,
        production: false,
      },
    },
  ],
}
