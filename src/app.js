const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// ✅ Debugging Middleware: Log every request
app.use((req, res, next) => {
    console.log(`🔍 Incoming Request: ${req.method} ${req.url}`);
    next();
}
);

// ✅ Import and use central routes
const routes = require("./routes/index");
app.use("/", routes); // Prefix all routes with "/api"

// Start Server
const PORT = process.env.PORT || 3000;
const SERVER_URL = `http://localhost:${PORT}`;

app.listen(PORT, () => {
    console.log(`✅ Server is running at: ${SERVER_URL}`);
});
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});