const model = require('../models');
const { Op, Sequelize } = require('sequelize');

var usersAPI = {
    createUsers: (req, resp) => {
        createUsers(req, resp);
    },
    updateUsers: (req, resp) => {
        req.body["id"] = req.params.id;
        updateUsers(req.body, resp);
    },
    getUsersById: (req, resp) => {
        getUsersById(req.params, resp);
    },
    getUsersList: (req, resp) => {
        getUsersList(req, resp);
    },
    deleteUsers: (req, resp) => {
        deleteUsers(req.params, resp);
    }
};

// Create a new users entry
async function createUsers(req, resp) {
    try {
        console.log("Received data:", req.body);
        req.body['createdAt'] = Sequelize.fn('NOW');
        req.body['createdBy'] = req.headers['userauthid'];

        console.log("Models:", model);
console.log("Users Model:", model.users);

        let users = await model.users.create(req.body);
        return resp.status(201).send(users);
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

// Update an existing users entry
async function updateUsers(reqBody, resp) {
    try {
        let updatedRows = await model.users.update(reqBody, { where: { id: reqBody.id } });

        if (updatedRows[0] === 0) {
            return resp.status(404).send({ message: "Users record not found" });
        }

        return resp.status(200).send({ message: "Users updated successfully" });
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

// Get a Users record by ID
async function getUsersById(reqParams, resp) {
    try {
        let users = await model.users.findOne({
            where: { id: reqParams.id },
            attributes: ["id", "lineId", "createdBy", "createdAt"],
            raw: true
        });

        if (!users) {
            return resp.status(404).send({ message: "Users record not found" });
        }

        return resp.send(users);
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

// Get the list of Users records
async function getUsersList(req, resp) {
    try {
        let { search } = req.query;
        let searchCriteria = search ? {
            [Op.or]: [
                { lineId: { [Op.like]: `%${search}%` } },
                { createdBy: { [Op.like]: `%${search}%` } }
            ]
        } : {};

        let users = await model.users.findAll({
            where: searchCriteria,
            order: [["createdAt", "DESC"]],
            raw: true
        });

        return resp.send(users);
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

// Delete a Users record
async function deleteUsers(reqParams, resp) {
    try {
        let deletedRows = await model.users.destroy({ where: { id: reqParams.id } });

        if (deletedRows === 0) {
            return resp.status(404).send({ message: "Users record not found" });
        }

        return resp.status(200).send({ message: "Users deleted successfully" });
    } catch (err) {
        console.error(err);
        return resp.status(500).send(err);
    }
}

module.exports = usersAPI;
