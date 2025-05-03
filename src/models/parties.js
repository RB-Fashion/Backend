module.exports = (sequelize, DataTypes) => {
    const Parties = sequelize.define("Parties", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL(10, 2)
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: true
        },
        modifiedBy: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        modifiedDate: {
            type: DataTypes.DATE
        }
    }, {
        timestamps: false, // Disable default createdAt and updatedAt
        freezeTableName: true,
        tableName: "parties",
    });

    return Parties;
};
