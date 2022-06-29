const {Item, Tag} = require('../models/models');

class ItemController {
    async create(reg, res) {
        const {name, tags, collectionId} = reg.body;
        let {id} = reg.body;
        let arr = [];
        if(id === undefined){
            const newItem = await Item.create({name, collectionId})
            id = newItem.id;
        }

        for (let i = 0; i< tags.length;i++) {
            let tag = await Tag.findOrCreate({where: tags[i]});
            arr.push(tag[0]);
        };

        const item = await Item.findOne({where: {id: id}, include:Tag});
        item.setTags(arr);

        return res.json(id);
    }

    async getAll(reg, res) {
        const items = await Item.findAll();
        return res.json(items);
    }

    async getOne(reg, res) {

    }

    async delete(reg, res) {
        const {id} = reg.params;
        const collection = await Item.destroy({
            where: {id}
        }).then((result, err) => {
            if (err) {
                return {err: err};
            }
            if (result) {
                return {message: "ItemId had been deleted"};
            }
        });
        return res.json(collection);
    }
}

module.exports = new ItemController();