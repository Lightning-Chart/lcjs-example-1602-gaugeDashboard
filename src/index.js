const lcjs = require('@lightningchart/lcjs')
const { lightningChart, Themes, AxisScrollStrategies, AxisTickStrategies, emptyFill, emptyLine } = lcjs

// Create HTML elements for the dashboard layout
const exampleContainer = document.getElementById('chart') || document.body
if (exampleContainer === document.body) {
    exampleContainer.style.width = '100vw'
    exampleContainer.style.height = '100vh'
    exampleContainer.style.margin = '0px'
}
exampleContainer.style.display = 'flex'
exampleContainer.style.flexDirection = 'row'
const gaugeLayout = document.createElement('div')
exampleContainer.append(gaugeLayout)
gaugeLayout.style.width = '25%'
gaugeLayout.style.height = '100%'
const xyContainer = document.createElement('div')
exampleContainer.append(xyContainer)
xyContainer.style.width = '75%'
xyContainer.style.height = '100%'

// Initialize LightningChart JS
const lc = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })

const gaugeChartArray = []
const lineSeriesArray = []

// Create XY chart for line series
const xyChart = lc
    .ChartXY({
        legend: { visible: false },
        container: xyContainer,
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
    })
    .setTitle('')
    .setCursor((cursor) => cursor.setTickMarkerXVisible(false))
xyChart
    .getDefaultAxisX()
    .setTickStrategy(AxisTickStrategies.Empty)
    .setThickness(0)
    .setStrokeStyle(emptyLine)
    .setScrollStrategy(AxisScrollStrategies.scrolling)
    .setInterval({ start: 0, end: 10_000, stopAxisAfter: false })
xyChart.getDefaultAxisY().dispose()

// Create dashboard rows
for (let iCh = 0; iCh < 4; iCh++) {
    const axisY = xyChart
        .addAxisY({ iStack: 4 - iCh })
        .setMargins(5, 5)
        .setInterval({ start: 0, end: 100 })
    const lineSeries = xyChart.addLineSeries({ axisY }).setMaxSampleCount(10_000)
    lineSeriesArray.push(lineSeries)

    const gaugeContainer = document.createElement('div')
    gaugeLayout.append(gaugeContainer)
    gaugeContainer.style.height = '25%'
    const gauge = lc
        .Gauge({
            container: gaugeContainer,
            theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
        })
        .setTitle('')
        .setUnitLabel(`Channel ${iCh + 1}`)
        .setInterval(0, 100)
        .setAngleInterval(180, 0)
        .setRoundedEdges(false)
        .setBarThickness(20)
        .setNeedleLength(20)
        .setNeedleThickness(5)
        .setValueIndicatorThickness(10)
        .setGapBetweenBarAndValueIndicators(1)
        .setTickFormatter((tick) => tick.toFixed(0))
        .setValueLabelFont((font) => font.setSize(24))
        .setUnitLabelFont((font) => font.setSize(16))
        .setTickFont((font) => font.setSize(16))
    gaugeChartArray.push(gauge)
}

// Construct value indicator array from a color palette
const valueIndicators = []
const colorPalette = gaugeChartArray[0].getTheme().examples.badGoodColorPalette
const intervalStart = 0
const intervalEnd = 100
const stepSize = (intervalEnd - intervalStart) / colorPalette.length
colorPalette.forEach((color, index) => {
    valueIndicators.push({
        start: intervalStart + stepSize * index,
        end: intervalStart + stepSize * (index + 1),
        color,
    })
})
gaugeChartArray.forEach((gauge) => gauge.setValueIndicators(valueIndicators))

// Generate random real-time data
const prevValues = lineSeriesArray.map((_) => Math.random() * 100)
setInterval(() => {
    const currentTime = performance.now()
    for (let iCh = 0; iCh < 4; iCh++) {
        const prev = prevValues[iCh]
        const currentValue = Math.max(Math.min(prev + 5 * (Math.random() * 2 - 1), 100), 0)
        prevValues[iCh] = currentValue
        lineSeriesArray[iCh].appendJSON({ x: currentTime, y: currentValue })
        gaugeChartArray[iCh].setValue(currentValue)
    }
}, 1000 / 60)
