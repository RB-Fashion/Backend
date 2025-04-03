const express = require("express");
const router = express.Router();

// Import individual route files
require("./production")(router);
require("./login")(router);

// Export router
module.exports = router;
