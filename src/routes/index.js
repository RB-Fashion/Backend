const express = require("express");
const router = express.Router();

// Import individual route files
require("./production")(router);
require("./users")(router);

require("./parties")(router);
require("./invoices")(router);
require("./payments")(router);

// Export router
module.exports = router;
