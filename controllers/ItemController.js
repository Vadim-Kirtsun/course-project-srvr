const {Item, Tag} = require('../models/models');

class ItemController {

    async create(reg, res) {
        console.log(reg.body);
        const {name, tags, collectionId} = reg.body;
        const item = await Item.create({name, collectionId, tags},
            {include: [Tag]});
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