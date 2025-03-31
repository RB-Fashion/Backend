module.exports = (sequelize, DataTypes) => {
    const Production = sequelize.define("Production", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        lineId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: true, // Enables createdAt & updatedAt
        freezeTableName: true, // Prevents Sequelize from pluralizing table name
        tableName: "production" // Explicitly sets table name
    });

    return Production;
};
