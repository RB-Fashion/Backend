module.exports = (sequelize, DataTypes) => {
    const Invoice = sequelize.define("Invoice", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        invoiceNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jobNo: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
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
        tableName: "invoices"
    });

    return Invoice;
};
