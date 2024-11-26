// chart.js

async function fetchBitcoinData() {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max');
    const data = await response.json();
    return data.prices.map(([timestamp, price]) => ({ date: new Date(timestamp), price }));
}

function createChart(data) {
    const halvings = [
        { date: new Date('2012-11-28'), label: 'First Halving', block: 210000 },
        { date: new Date('2016-07-09'), label: 'Second Halving', block: 420000 },
        { date: new Date('2020-05-11'), label: 'Third Halving', block: 630000 },
        { date: new Date('2024-04-19'), label: 'Fourth Halving', block: 840000 }
    ];

    // Convert dates to timestamps for Chart.js
    const chartData = {
        labels: data.map(item => item.date.toISOString().split('T')[0]),
        datasets: [{
            label: 'Bitcoin Price',
            data: data.map(item => item.price),
            borderColor: 'blue',
            fill: false
        }]
    };

    // Add halvings as vertical lines
    const annotation = {
        annotations: halvings.map((halving, index) => ({
            type: 'line',
            mode: 'vertical',
            scaleID: 'x',
            value: halving.date.toISOString().split('T')[0],
            borderColor: ['red', 'green', 'purple', 'orange'][index],
            borderWidth: 2,
            label: {
                content: halving.label,
                enabled: true,
                position: 'top'
            }
        }))
    };

    // Chart.js configuration
    const ctx = document.getElementById('bitcoinChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                },
                y: {
                    beginAtZero: false
                }
            },
            plugins: {
                annotation: annotation
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchBitcoinData().then(createChart);
});