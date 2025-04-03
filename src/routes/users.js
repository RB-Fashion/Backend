const _users = require('../controllers/users');

module.exports = function (appObj) {
    appObj.get("/users/list", _users.getUsersList);
    appObj.get("/users/:id", _users.getUsersById);
    appObj.post("/users/create", _users.createUsers);
    appObj.put("/users/:id", _users.updateUsers);
    appObj.delete("/users/:id", _users.deleteUsers);
};
