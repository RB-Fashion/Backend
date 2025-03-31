const model = require('../models');
const { Op, Sequelize } = require('sequelize');

var productionAPI = {
    createProduction: (req, resp) => {
        createProduction(req, resp);
    },
    updateProduction: (req, resp) => {
        req.body["id"] = req.params.id;
        updateProduction(req.body, resp);
    },
    getProductionById: (req, resp) => {
        getProductionById(req.params, resp);
    },
    getProductionList: (req, resp) => {
        getProductionList(req, resp);
    },
    deleteProduction: (req, resp) => {
        deleteProduction(req.params, resp);
    }
};

// Create a new production entry
async function createProduction(req, resp) {
    try {
        req.body['createdAt'] = Sequelize.fn('NOW');
        req.body['createdBy'] = req.headers['userauthid'];

        let production = await model.production.create(req.body);
        return resp.status(201).send(production);
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

// Update an existing production entry
async function updateProduction(reqBody, resp) {
    try {
        let updatedRows = await model.production.update(reqBody, { where: { id: reqBody.id } });

        if (updatedRows[0] === 0) {
            return resp.status(404).send({ message: "Production record not found" });
        }

        return resp.status(200).send({ message: "Production updated successfully" });
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

// Get a production record by ID
async function getProductionById(reqParams, resp) {
    try {
        let production = await model.production.findOne({
            where: { id: reqParams.id },
            attributes: ["id", "lineId", "createdBy", "createdAt"],
            raw: true
        });

        if (!production) {
            return resp.status(404).send({ message: "Production record not found" });
        }

        return resp.send(production);
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

// Get the list of production records
async function getProductionList(req, resp) {
    try {
        let { search } = req.query;
        let searchCriteria = search ? {
            [Op.or]: [
                { lineId: { [Op.like]: `%${search}%` } },
                { createdBy: { [Op.like]: `%${search}%` } }
            ]
        } : {};

        let productions = await model.production.findAll({
            where: searchCriteria,
            order: [["createdAt", "DESC"]],
            raw: true
        });

        return resp.send(productions);
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

// Delete a production record
async function deleteProduction(reqParams, resp) {
    try {
        let deletedRows = await model.production.destroy({ where: { id: reqParams.id } });

        if (deletedRows === 0) {
            return resp.status(404).send({ message: "Production record not found" });
        }

        return resp.status(200).send({ message: "Production deleted successfully" });
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

module.exports = productionAPI;
