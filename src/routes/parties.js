const _Parties = require('../controllers/Parties');

module.exports = function (appObj) {
    appObj.get("/Parties/list", _Parties.getPartiesList);
    appObj.get("/Parties/:id", _Parties.getPartiesById);
    appObj.post("/Parties/create", _Parties.createParties);
    appObj.put("/Parties/:id", _Parties.updateParties);
    appObj.delete("/Parties/:id", _Parties.deleteParties);
};
