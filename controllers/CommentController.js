const {Comment} = require('../models/models');
const ApiError = require('../error/ApiError');


class ItemController {

    async create(reg, res) {
        const {name} = reg.body;
        const comment = await Comment.create({name});
        return res.json(comment);

    }

    async getAll(reg, res) {
        const comments = await Comment.findAll();
        return res.json(comments);
    }

    async getOne(reg, res) {

    }

    async delete(reg, res) {

    }
}

module.exports = new ItemController();