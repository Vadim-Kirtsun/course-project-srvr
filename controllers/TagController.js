const { Tag } = require('../models/models');
const ApiError = require('../error/ApiError');


class TagController {

    async create(reg, res) {
        const {name} = reg.body;
        const tag = await Tag.create({name});
        return res.json(tag);
    }

    async getAll(reg, res) {
        const tags = await Tag.findAll();
        return res.json(tags);
    }

    async delete(reg, res) {

    }
}

module.exports = new TagController();