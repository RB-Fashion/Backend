const _invoices = require('../controllers/invoices');

module.exports = function (appObj) {
    appObj.get("/invoices/list", _invoices.getInvoicesList);
    appObj.get("/invoices/:id", _invoices.getInvoicesById);
    appObj.post("/invoices/create", _invoices.createInvoices);
    appObj.put("/invoices/:id", _invoices.updateInvoices);
    appObj.delete("/invoices/:id", _invoices.deleteInvoices);
};
