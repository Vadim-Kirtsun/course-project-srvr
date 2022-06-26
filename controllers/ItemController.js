const {Item, Tag} = require('../models/models');

class ItemController {
    async create(reg, res) {
        const {name, tags, collectionId} = reg.body;
         const item = await Item.create({name, collectionId}).then(it => {
             it.setTags([]);
             for (let i = 0; i< tags.length;i++) {
                 Tag.findOrCreate({where: tags[i]}).then(tg => {
                     it.addTag(tg[0]);
                 });
             };
         });
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