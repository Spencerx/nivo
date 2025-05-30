import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import range from 'lodash/range.js'
import { ResponsiveVoronoi, defaultVoronoiProps } from '@nivo/voronoi'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/voronoi/meta.yml'
import { groups } from '../../data/components/voronoi/props'

const xDomain: [number, number] = [0, 100]
const yDomain: [number, number] = [0, 100]

const generateData = () =>
    range(100).map(id => ({ id, x: Math.random() * xDomain[1], y: Math.random() * yDomain[1] }))

const initialProperties = {
    ...defaultVoronoiProps,
    xDomain,
    yDomain,
    margin: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1,
    },
    enableLinks: true,
    linkLineWidth: 1,
    linkLineColor: '#cccccc',
    enableCells: true,
    cellLineWidth: 2,
    cellLineColor: '#c6432d',
    enablePoints: true,
    pointSize: 6,
    pointColor: '#c6432d',
}

const Voronoi = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/voronoi.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="Voronoi"
            meta={meta.Voronoi}
            icon="voronoi"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaultVoronoiProps}
            generateData={generateData}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, _logAction, chartRef) => {
                return (
                    <ResponsiveVoronoi
                        {...properties}
                        data={data}
                        theme={theme}
                        ref={chartRef as Ref<SVGSVGElement>}
                        debounceResize={200}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Voronoi
