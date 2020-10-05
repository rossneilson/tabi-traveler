const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `Tabi Traveler`,
    description: `Tabi Traveler photography, portfolio, blog and store`,
    author: `Ross Neilson`,
    siteUrl: `https://www.tabitraveler.com`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `img`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "portfolio",
        path: `${__dirname}/src/markdown/portfolio`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "blog",
        path: `${__dirname}/src/markdown/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "store",
        path: `${__dirname}/src/markdown/store`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "general",
        path: `${__dirname}/src/markdown/general`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tabi Traveler - Photography`,
        short_name: `Tabi Traveler`,
        start_url: `/`,
        background_color: `#8698da`,
        theme_color: `#8698da`,
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
        redirect: false,
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
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxHeight: 500,
            },
          },
        ],
      },
    },
    `gatsby-plugin-netlify-cms-paths`,
    `gatsby-plugin-nprogress`,
    "gatsby-plugin-loadable-components-ssr",
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-webpack-bundle-analyzer",
      options: {
        analyzerPort: 3000,
        production: true,
      },
    },
  ],
}
