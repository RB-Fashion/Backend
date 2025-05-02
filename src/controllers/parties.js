const model = require('../models');
const { Op, Sequelize } = require('sequelize');

var partiesAPI = {
    createParties: (req, resp) => {
        createParties(req, resp);
    },
    updateParties: (req, resp) => {
        req.body["id"] = req.params.id;
        updateParties(req.body, resp);
    },
    getPartiesById: (req, resp) => {
        getPartiesById(req.params, resp);
    },
    getPartiesList: (req, resp) => {
        getPartiesList(req, resp);
    },
    deleteParties: (req, resp) => {
        deleteParties(req.params, resp);
    }
};

async function createParties(req, resp) {
    console.log("@@createParties", req.body);
    try {
        req.body['createdDate'] = Sequelize.fn('NOW');
        req.body['createdBy'] = req.headers['userauthid'];

        let parties = await model.parties.create(req.body);
        return resp.status(201).send(parties);
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

async function updateParties(reqBody, resp) {
    try {
        let updatedRows = await model.parties.update(reqBody, { where: { id: reqBody.id } });
        if (updatedRows[0] === 0) return resp.status(404).send({ message: "Party not found" });
        return resp.status(200).send({ message: "Party updated successfully" });
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

async function getPartiesById(reqParams, resp) {
    try {
        let party = await model.parties.findOne({
            where: { id: reqParams.id },
            raw: true
        });
        if (!party) return resp.status(404).send({ message: "Party not found" });
        return resp.send(party);
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

async function getPartiesList(req, resp) {
    try {
        let { search } = req.query;
        let criteria = search ? {
            [Op.or]: [{ name: { [Op.like]: `%${search}%` } }]
        } : {};

        let list = await model.parties.findAll({
            where: criteria,
            order: [["createdDate", "DESC"]],
            raw: true
        });
        console.log("Parties List", list);

        return resp.send(list);
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

async function deleteParties(reqParams, resp) {
    try {
        let deletedRows = await model.parties.destroy({ where: { id: reqParams.id } });
        if (deletedRows === 0) return resp.status(404).send({ message: "Party not found" });
        return resp.status(200).send({ message: "Party deleted successfully" });
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

module.exports = partiesAPI;
