const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// Import Routes
const productionRoutes = require('./routes/production'); // Adjust the path
app.use('/production', productionRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
const SERVER_URL = `http://localhost:${PORT}`;

app.listen(PORT, () => {
    console.log(`✅ Server is running at: ${SERVER_URL}`);
});
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

