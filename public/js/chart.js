// chart.js

// Wait for all dependencies to load
document.addEventListener('DOMContentLoaded', async () => {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded!');
        return;
    }

    const data = await fetchBitcoinData();
    if (data.length === 0) {
        console.error('No data available');
        return;
    }

    createChart(data);
    
    // Update chart periodically
    setInterval(async () => {
        const newData = await fetchBitcoinData();
        createChart(newData);
    }, 5 * 60 * 1000); // Update every 5 minutes
});

async function fetchBitcoinData() {
    try {
        const response = await fetch('/api/bitcoin');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        if (!data.Data || !data.Data.Data) {
            throw new Error('Invalid data format');
        }

        console.log('Data fetched successfully:', data.Data.Data.length, 'points');
        
        // Convert the data format
        return data.Data.Data.map(item => ({
            date: new Date(item.time * 1000),
            price: item.close
        })).filter(item => item.price !== null);
    } catch (error) {
        console.error('Error fetching Bitcoin data:', error);
        return [];
    }
}

function createChart(data) {
    if (!data.length) {
        console.error('No data available to create chart');
        return;
    }

    const halvings = [
        { date: new Date('2012-11-28'), label: 'First Halving (12.5 → 6.25 BTC)', block: 210000, roi: '9,000%' },
        { date: new Date('2016-07-09'), label: 'Second Halving (25 → 12.5 BTC)', block: 420000, roi: '2,800%' },
        { date: new Date('2020-05-11'), label: 'Third Halving (12.5 → 6.25 BTC)', block: 630000, roi: '650%' },
        { date: new Date('2024-04-19'), label: 'Fourth Halving (6.25 → 3.125 BTC)', block: 840000, roi: 'TBD' }
    ];

    const ctx = document.getElementById('bitcoinChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.bitcoinPriceChart instanceof Chart) {
        window.bitcoinPriceChart.destroy();
    }

    window.bitcoinPriceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(item => item.date),
            datasets: [{
                label: 'Bitcoin Price (USD)',
                data: data.map(item => item.price),
                borderColor: 'rgb(31, 119, 180)',
                backgroundColor: 'rgba(31, 119, 180, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.1,
                pointRadius: 0, // Hide points for cleaner look
                pointHitRadius: 5 // But keep hover detection
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'year',
                        displayFormats: {
                            year: 'yyyy',
                            month: 'MMM yyyy'
                        }
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    title: {
                        display: true,
                        text: 'Date',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        maxRotation: 0,
                        autoSkip: true,
                        autoSkipPadding: 20
                    }
                },
                y: {
                    type: 'logarithmic',
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    title: {
                        display: true,
                        text: 'Price (USD)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            if (value === 0) return '$0';
                            if (value < 1) return '$' + value.toFixed(2);
                            const k = value / 1000;
                            const m = value / 1000000;
                            if (m >= 1) return '$' + m.toFixed(1) + 'M';
                            if (k >= 1) return '$' + k.toFixed(1) + 'K';
                            return '$' + value.toFixed(0);
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Bitcoin Price History with Halving Events',
                    font: {
                        size: 20,
                        weight: 'bold'
                    },
                    padding: 20
                },
                subtitle: {
                    display: true,
                    text: 'Historical price performance with Bitcoin halving events marked',
                    padding: {
                        bottom: 30
                    }
                },
                annotation: {
                    annotations: halvings.map((halving, index) => ({
                        type: 'line',
                        xMin: halving.date,
                        xMax: halving.date,
                        borderColor: ['#ff6384', '#36a2eb', '#4bc0c0', '#ff9f40'][index],
                        borderWidth: 2,
                        label: {
                            content: `${halving.label}\nROI: ${halving.roi}`,
                            enabled: true,
                            position: 'top',
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            color: '#666',
                            padding: 8,
                            font: {
                                size: 11
                            }
                        }
                    }))
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#666',
                    bodyColor: '#666',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
                    padding: 10,
                    callbacks: {
                        label: function(context) {
                            const price = context.parsed.y;
                            return `Price: $${price.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}`;
                        }
                    }
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}