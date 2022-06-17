const {AddFieldSet} = require('../models/models');
const ApiError = require('../error/ApiError');

class AddFieldSetController {

    async create(reg, res) {
        const {name} = reg.body;
        const addFieldSet = await AddFieldSet.create({name});
        return res.json(addFieldSet);
    }

    async getAll(reg, res) {
        const addFieldSets = await AddFieldSet.findAll();
        return res.json(addFieldSets);
    }

    async delete(reg, res) {

    }
}

module.exports = new AddFieldSetController();