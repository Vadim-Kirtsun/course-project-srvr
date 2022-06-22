const {AddField} = require('../models/models');
const ApiError = require('../error/ApiError');

class AddFieldController {

    async create(reg, res) {
        const {collectionId,additionalField} = reg.body;
        console.log(reg.body);
        console.log(collectionId);
        const addField = await AddField.create({name: additionalField.name, collectionId:collectionId});
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