const _payments = require('../controllers/payments');

module.exports = function (appObj) {
    appObj.get("/payments/list", _payments.getPaymentsList);
    appObj.get("/payments/:id", _payments.getPaymentsById);
    appObj.post("/payments/create", _payments.createPayments);
    appObj.put("/payments/:id", _payments.updatePayments);
    appObj.delete("/payments/:id", _payments.deletePayments);
};
