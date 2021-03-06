import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Sphere,
  Annotation,
} from "react-simple-maps"

import countries from "../../map/mapCountries.json"

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

const highlighted = countries.highlighted

export default function FilterMap({ filter, setFilter }) {
  const intl = useIntl()

  return (
    <ComposableMap height={900} projection="geoMercator">
      <Sphere stroke="#DDD" />
      <ZoomableGroup center={[60, 12]} zoom={1.6}>
        <Geographies geography={geoUrl} stroke="#FFF" strokeWidth={0.5}>
          {({ geographies }) =>
            geographies.map(geo => {
              const isHighlighted =
                highlighted.indexOf(geo.properties.ISO_A3) !== -1
              const isSelected = filter === geo.properties.ISO_A3 ? true : false
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    isHighlighted
                      ? isSelected
                        ? "#f79a60"
                        : "#8698da"
                      : "#D6D6DA"
                  }
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    isHighlighted ? setFilter(geo.properties.ISO_A3) : null
                  }
                />
              )
            })
          }
        </Geographies>

        <Annotation
          subject={[141, 43]}
          dx={-64}
          dy={-30}
          curve={0.3}
          connectorProps={{
            stroke: "#FF5533",
            strokeWidth: 3,
            strokeLinecap: "round",
          }}
        >
          <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
            {intl.formatMessage({ id: "portfolio.click" })}
          </text>
        </Annotation>
      </ZoomableGroup>
    </ComposableMap>
  )
}
