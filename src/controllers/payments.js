// controllers/payments.js
const model = require('../models');
const { Op, Sequelize } = require('sequelize');

var paymentsAPI = {
    createPayments: (req, resp) => {
        createPayments(req, resp);
    },
    updatePayments: (req, resp) => {
        req.body["id"] = req.params.id;
        updatePayments(req.body, resp);
    },
    getPaymentsById: (req, resp) => {
        getPaymentsById(req.params, resp);
    },
    getPaymentsList: (req, resp) => {
        getPaymentsList(req, resp);
    },
    deletePayments: (req, resp) => {
        deletePayments(req.params, resp);
    }
};

// Create a new payment entry
async function createPayments(req, resp) {
    try {
        req.body['createdAt'] = Sequelize.fn('NOW');
        req.body['createdBy'] = req.headers['userauthid'];

        let payment = await model.Payment.create(req.body);
        return resp.status(201).send(payment);
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

// Update an existing payment entry
async function updatePayments(reqBody, resp) {
    try {
        let updatedRows = await model.payments.update(reqBody, { where: { id: reqBody.id } });

        if (updatedRows[0] === 0) {
            return resp.status(404).send({ message: "Payment record not found" });
        }

        return resp.status(200).send({ message: "Payment updated successfully" });
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

// Get a payment record by ID
async function getPaymentsById(reqParams, resp) {
    try {
        let payment = await model.payments.findOne({
            where: { id: reqParams.id },
            attributes: ["id", "invoiceId", "amount", "paymentDate", "paymentMode", "createdBy", "createdAt"],
            raw: true
        });

        if (!payment) {
            return resp.status(404).send({ message: "Payment record not found" });
        }

        return resp.send(payment);
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

// Get the list of payment records
async function getPaymentsList(req, resp) {
    try {
        let { search } = req.query;
        let searchCriteria = search ? {
            [Op.or]: [
                { paymentMode: { [Op.like]: `%${search}%` } },
                { createdBy: { [Op.like]: `%${search}%` } }
            ]
        } : {};

        let payments = await model.Payment.findAll({
            where: searchCriteria,
            order: [["createdDate", "DESC"]],
            raw: true
        });

        return resp.send(payments);
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

// Delete a payment record
async function deletePayments(reqParams, resp) {
    try {
        let deletedRows = await model.payments.destroy({ where: { id: reqParams.id } });

        if (deletedRows === 0) {
            return resp.status(404).send({ message: "Payment record not found" });
        }

        return resp.status(200).send({ message: "Payment deleted successfully" });
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

module.exports = paymentsAPI;
