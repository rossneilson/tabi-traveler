import Typography from "typography"
import theme from "typography-theme-moraga"
import "fontsource-source-sans-pro"

theme.overrideThemeStyles = () => ({})

const typography = new Typography(theme, { googleFonts: [{}] })

export default typography
