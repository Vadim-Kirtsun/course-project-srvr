const {AddField} = require('../models/models');
const ApiError = require('../error/ApiError');

class AddFieldController {

    async create(reg, res) {
        const {name} = reg.body;
        const addField = await AddField.create({name});
        return res.json(addField);
    }

    async getAll(reg, res) {
        const addFields = await AddField.findAll();
        return res.json(addFields);
    }

    async delete(reg, res) {

    }
}

module.exports = new AddFieldController();