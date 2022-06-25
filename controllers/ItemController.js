const {Item} = require('../models/models');

class ItemController {

    async create(reg, res) {
        const {name, collectionId} = reg.body;
        const item = await Item.create({name, collectionId});
        return res.json(item);
    }

    async getAll(reg, res) {
        const items = await Item.findAll();
        return res.json(items);
    }

    async getOne(reg, res) {

    }

    async delete(reg, res) {

    }
}

module.exports = new ItemController();