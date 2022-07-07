const { Tag } = require('../models/models');
const ApiError = require('../error/ApiError');
const {Item} = require("../models/models");


class TagController {

    async create(reg, res) {
        const {tags, itemId} = reg.body;
        console.log(tags);
        console.log(itemId);
        let tag = {};
        for (let i = 0; i< tags.length;i++) {
            tag = await Tag.findOne({where: tags[i],include: Item});
            if(!tag){
                tag = await Tag.create(tags[i]);
            }
            const item = await Item.findOne({where: {id: itemId}, include: {model: Tag}})

            console.log(tag.dataValues.id);
            console.log(tag.dataValues.name);
            console.log(item.tags);
            console.log(!item);

            /*if(item){
                tag.addItems(Item.findOne({where: {id: itemId}}).dataValues);
                tag.save();
            }*/
        };
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