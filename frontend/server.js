const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static('public'));

// Proxy endpoint to forward requests to Flask
app.post('/calc', async (req, res) => {
    try {
        const response = await fetch('http://localhost:5001/calc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Error forwarding request to Flask:', err);
        res.status(500).json({ error: 'Server connection failed' });
    }
});

app.listen(PORT, () => {
    // console.log(`Frontend running at http://localhost:${PORT}`);
});