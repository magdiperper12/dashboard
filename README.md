# Global Insight Dashboard

A responsive six-page sales analytics dashboard built with HTML, CSS, vanilla JavaScript, Chart.js and Plotly.

## Run
Open `index.html` in a modern browser. Internet access is required for Google Fonts, Chart.js and Plotly CDN assets.

## Pages
- Landing / Login
- Overview
- Sales Analysis
- Products
- Markets
- Customers & Reports

## Chart integration points
Every visualization has a stable wrapper ID, including:
`salesChart`, `mapChart`, `salesProfitChart`, `monthlySalesChart`, `topProductsChart`, `profitChart`, `worldMap`, `segmentChart`, `shippingChart`.

Replace the demo data in `app.js` with API data. You can also replace a chart container's content with a Power BI embed iframe.

## Notes
- The login buttons currently open the demo workspace; authentication is not connected.
- Export Excel is delivered as CSV, which opens in Excel.
- Export PDF opens a print-ready report; choose "Save as PDF" in the browser print dialog.
- All displayed metrics are sample/demo data, not live business data.
