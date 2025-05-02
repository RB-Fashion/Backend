module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        paymentNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE
        },
        paymentMode: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2)
        },
        partiesId: {
            type: DataTypes.INTEGER,
            references: {
                model: "parties",
                key: "id"
            }
        },
        createdBy: {
            type: DataTypes.STRING
        },
        modifiedBy: {
            type: DataTypes.STRING
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        modifiedDate: {
            type: DataTypes.DATE
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: "payments"
    });

    return Payment;
};
