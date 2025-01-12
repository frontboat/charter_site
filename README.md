# Bitcoin Price History Visualization

An interactive visualization of Bitcoin's price history with halving events marked. This project provides a clean, responsive chart showing Bitcoin's price movements and significant halving events that have influenced its value over time.

![Bitcoin Price Chart](screenshot.png)

## Features

- 📈 Real-time Bitcoin price data from CryptoCompare API
- 📊 Interactive logarithmic price scale
- 🔍 Hover tooltips with precise price information
- ⚡ Halving events marked with ROI information
- 🔄 Auto-updates every 5 minutes
- 📱 Fully responsive design
- 💫 Smooth animations and transitions

## Technologies Used

- Node.js & Express.js for the backend
- Chart.js for data visualization
- CryptoCompare API for Bitcoin price data

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v12 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/modeofO/charter_site.git
   cd charter_site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Development

To modify the chart:
- Frontend code is in `public/js/chart.js`
- Styling is in `public/index.html`
- Backend API proxy is in `server.js`

## API Information

This project uses the CryptoCompare API to fetch Bitcoin price data. The data includes:
- Daily price points from 2010 to present
- OHLCV (Open, High, Low, Close, Volume) data
- Automatic updates every 5 minutes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Data provided by [CryptoCompare](https://www.cryptocompare.com/)
- Chart visualization powered by [Chart.js](https://www.chartjs.org/)
- Bitcoin halving dates from [Bitcoin Wiki](https://en.bitcoin.it/wiki/Halving_day) 