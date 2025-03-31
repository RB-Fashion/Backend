const _production = require('../controllers/production');

module.exports = function (appObj) {
    appObj.get("/production/list", _production.getProductionList);
    appObj.get("/production/:id", _production.getProductionById);
    appObj.post("/production/create", _production.createProduction);
    appObj.put("/production/:id", _production.updateProduction);
    appObj.delete("/production/:id", _production.deleteProduction);
};
