
const {Item, ItemTag, Tag} = require("../models/models");


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
            await Item.findOne({where: {id: itemId}, include: {model: Tag}})

        };
        return res.json(tag);
    }

    async getAll(reg, res) {
        const tags = await Tag.findAll();
        return res.json(tags);
    }
    async getTagsWithItemCount(reg, res) {
        const tags = await Tag.findAll({
            attributes: {
                include: [
                    [Tag.sequelize.fn('COUNT', Tag.sequelize.col('item_tags.itemId')), 'count']]
            },
            include: [{
                attributes: [],
                model: ItemTag,
                duplicating: false,
                required: false
            }
              ],
            group: ['tag.id'],
            order: [['count', 'DESC']],
        });
        return res.json(tags);
    }

    async delete(reg, res) {

    }
}

module.exports = new TagController();