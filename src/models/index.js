const { sequelize, DataTypes } = require('../config/db.config');

const Production = require('./production')(sequelize, DataTypes);

sequelize.sync({ alter: true }) // Sync changes to DB
    .then(() => console.log("Database synced!"))
    .catch(err => console.log("Sync error: ", err));

module.exports = { sequelize, Production };
