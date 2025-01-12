const express = require('express');
const app = express();
const path = require('path');
const https = require('https');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint for Bitcoin data
app.get('/api/bitcoin', (req, res) => {
    // Calculate allData timestamp (July 2010 - Bitcoin's early trading days)
    const startTime = Math.floor(new Date('2010-07-01').getTime() / 1000);
    const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=2000&toTs=${Math.floor(Date.now() / 1000)}&aggregate=1&e=CCCAGG&allData=true`;
    
    https.get(url, (response) => {
        let data = '';
        
        response.on('data', (chunk) => {
            data += chunk;
        });
        
        response.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                res.json(jsonData);
            } catch (error) {
                console.error('Error parsing data:', error);
                res.status(500).json({ error: 'Failed to parse data' });
            }
        });
    }).on('error', (err) => {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));