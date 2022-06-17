const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');


class TypeController {

    async getAll(reg, res) {
        const types = await Type.findAll();
        return res.json(types);
    }
}

module.exports = new TypeController();