module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {  // Keep model names PascalCase
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING, // Use STRING instead of INTEGER for passwords
            allowNull: false
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        tableName: "users"
    });

    return Users; // Return the correct model
};
