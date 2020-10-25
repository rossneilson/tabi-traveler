const path = require(`path`)

module.exports = {
  siteMetadata: {
    en: {
      title: `Tabi Traveler`,
      description: `Tabi Traveler photography, portfolio, blog and store`,
    },
    jp: {
      title: `旅Traveler`,
      description: `旅Traveler 国際カップル写真家、 ポートフォリオ、ブログ、 プリント`,
    },
    blog: {
      en: {
        title: `Blog | Tabi Traveler`,
        description: `Tabi Traveler photography blog about international travel, photography`,
      },
      jp: {
        title: `ブログ　旅Traveler`,
        description: `旅Traveler 国際カップル写真家 ブログ、外国、内国、旅行、写真`,
      },
    },
    portfolio: {
      en: {
        title: `Portfolio | Tabi Traveler`,
        description: `Tabi Traveler portfolio of best photography from across the world`,
      },
      jp: {
        title: `ポートフォリオ　旅Traveler`,
        description: `旅Traveler 国際カップル写真家 ポートフォリオ`,
      },
    },
    prints: {
      en: {
        title: `Prints | Tabi Traveler`,
        description: `High qaulity photographic travel prints and frames, Free Worldwide shipping`,
      },
      jp: {
        title: `プリント　旅Traveler`,
        description: `旅Traveler 国際カップル写真家 高い質プリント店　無料国際発送`,
      },
    },
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
  ],
}
