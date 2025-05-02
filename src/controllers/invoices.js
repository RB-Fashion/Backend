const model = require('../models');
const { Op, Sequelize } = require('sequelize');

var invoicesAPI = {
    createInvoices: (req, resp) => createInvoices(req, resp),
    updateInvoices: (req, resp) => {
        req.body["id"] = req.params.id;
        updateInvoices(req.body, resp);
    },
    getInvoicesById: (req, resp) => getInvoicesById(req.params, resp),
    getInvoicesList: (req, resp) => getInvoicesList(req, resp),
    deleteInvoices: (req, resp) => deleteInvoices(req.params, resp),
};

async function createInvoices(req, resp) {
    console.log("@@create invoice",req.body)
    try {
        req.body.createdDate = Sequelize.fn('NOW');
        req.body.createdBy = req.headers['userauthid'];
        const result = await model.Invoice.create(req.body);
        return resp.status(201).send(result);
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

async function updateInvoices(data, resp) {
    try {
        const result = await model.invoices.update(data, { where: { id: data.id } });
        if (result[0] === 0) return resp.status(404).send({ message: "Invoices record not found" });
        return resp.status(200).send({ message: "Invoices updated successfully" });
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

async function getInvoicesById(params, resp) {
    try {
        const result = await model.invoices.findOne({ where: { id: params.id }, raw: true });
        if (!result) return resp.status(404).send({ message: "Invoices record not found" });
        return resp.send(result);
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

async function getInvoicesList(req, resp) {
    try {
        const { search } = req.query;
        const where = search ? {
            [Op.or]: [
                { invoiceNo: { [Op.like]: `%${search}%` } },
                { jobNo: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ]
        } : {};

        const result = await model.Invoice.findAll({ where, order: [["createdDate", "DESC"]], raw: true });
        return resp.send(result);
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

async function deleteInvoices(params, resp) {
    try {
        const result = await model.invoices.destroy({ where: { id: params.id } });
        if (result === 0) return resp.status(404).send({ message: "Invoices record not found" });
        return resp.status(200).send({ message: "Invoices deleted successfully" });
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

module.exports = invoicesAPI;
