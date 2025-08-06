# Gauge chart dashboard

![Gauge chart dashboard](gaugeDashboard-darkGold.png)

This demo application belongs to the set of examples for LightningChart JS, data visualization library for JavaScript.

LightningChart JS is entirely GPU accelerated and performance optimized charting library for presenting massive amounts of data. It offers an easy way of creating sophisticated and interactive charts and adding them to your website or web application.

The demo can be used as an example or a seed project. Local execution requires the following steps:

-   Make sure that relevant version of [Node.js](https://nodejs.org/en/download/) is installed
-   Open the project folder in a terminal:

          npm install              # fetches dependencies
          npm start                # builds an application and starts the development server

-   The application is available at _http://localhost:8080_ in your browser, webpack-dev-server provides hot reload functionality.


## Description

This example shows gauge charts on a dashboard with real-time data.

In this example, a custom angle interval is defined for the gauges:

```javascript
gauge.setAngleInterval(180, 0)
// Other common intervals:
// .setAngleInterval(135, 45)
// .setAngleInterval(225, -45)
// .setAngleInterval(270, -90)
```

The rounded edges of the gauge bar and value indicators can be disabled by:

```javascript
gauge.setRoundedEdges(false)
```


## API Links

* [Gauge Chart]
* [XY Chart]
* [Line Series]
* [Axis]


## Support

If you notice an error in the example code, please open an issue on [GitHub][0] repository of the entire example.

Official [API documentation][1] can be found on [LightningChart][2] website.

If the docs and other materials do not solve your problem as well as implementation help is needed, ask on [StackOverflow][3] (tagged lightningchart).

If you think you found a bug in the LightningChart JavaScript library, please contact sales@lightningchart.com.

Direct developer email support can be purchased through a [Support Plan][4] or by contacting sales@lightningchart.com.

[0]: https://github.com/Arction/
[1]: https://lightningchart.com/lightningchart-js-api-documentation/
[2]: https://lightningchart.com
[3]: https://stackoverflow.com/questions/tagged/lightningchart
[4]: https://lightningchart.com/support-services/

© LightningChart Ltd 2009-2022. All rights reserved.


[Gauge Chart]: https://lightningchart.com/js-charts/api-documentation/v8.0.0/classes/GaugeChart.html
[XY Chart]: https://lightningchart.com/js-charts/api-documentation/v8.0.0/classes/ChartXY.html
[Line Series]: https://lightningchart.com/js-charts/api-documentation/v8.0.0/classes/LineSeries.html
[Axis]: https://lightningchart.com/js-charts/api-documentation/v8.0.0/classes/Axis.html

