const path = require(`path`)

module.exports = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    en: {
      title: `Tabi Traveler`,
      description: `Tabi Traveler photography, portfolio, blog and store`,
    },
    ja: {
      title: `旅Traveler`,
      description: `旅Traveler 国際カップル写真家、 ポートフォリオ、ブログ、 プリント`,
    },
    blog: {
      en: {
        title: `Blog | Tabi Traveler`,
        description: `Tabi Traveler photography blog about international travel, photography`,
      },
      ja: {
        title: `ブログ　旅Traveler`,
        description: `旅Traveler 国際カップル写真家 ブログ、外国、内国、旅行、写真`,
      },
    },
    portfolio: {
      en: {
        title: `Portfolio | Tabi Traveler`,
        description: `Tabi Traveler portfolio of best photography from across the world`,
      },
      ja: {
        title: `ポートフォリオ　旅Traveler`,
        description: `旅Traveler 国際カップル写真家 ポートフォリオ`,
      },
    },
    prints: {
      en: {
        title: `Prints | Tabi Traveler`,
        description: `Tabi Traveler High qaulity photographic travel prints and frames, Free Worldwide shipping`,
      },
      ja: {
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
        languages: [`en`, `ja`],
        defaultLanguage: `en`,
        redirect: true,
      },
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography.js",
        omitGoogleFont: true,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 500,
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: ["Table of Contents", "目次", "「コナのコメント」"],
              tight: true,
              ordered: false,
              fromHeading: 1,
              toHeading: 10,
              className: "table-of-contents",
            },
          },
          `gatsby-remark-autolink-headers`,
        ],
      },
    },
    `gatsby-plugin-netlify-cms-paths`,
    `gatsby-plugin-nprogress`,
    "gatsby-plugin-loadable-components-ssr",
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-scroll-reveal`,
  ],
}
