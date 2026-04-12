const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Frontend running at http://localhost:${PORT}`);
});