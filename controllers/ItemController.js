const {Item, Tag, Comment, AddField, AddFieldValue} = require('../models/models');

class ItemController {
    async create(reg, res) {
        const {name, tags, addFields, collectionId} = reg.body;
        let {id} = reg.body;
        let tagArr = [];
        let addFieldsArr = [];
        if(id === undefined){
            const newItem = await Item.create({name, collectionId})
            id = newItem.id;
        }

        for (let i = 0; i< addFields.length;i++) {
            let addField = await AddFieldValue.findOne({where: {itemId: id,addFieldId: addFields[i].addField_id}});
            if (addField){
                addField = await AddFieldValue.update({value: addFields[i].value}, {where: {itemId: id,addFieldId: addFields[i].addField_id}});
            }else{
                addField = await AddFieldValue.create({value: addFields[i].value, itemId: id,addFieldId: addFields[i].addField_id});
            }
            addFieldsArr.push(addField);
        };

        for (let i = 0; i< tags.length;i++) {
            let tag = await Tag.findOrCreate({where: tags[i]});
            tagArr.push(tag[0]);
        };

        const item = await Item.findOne({where: {id: id}, include:[Tag, AddFieldValue]});
        item.setTags(tagArr);
        item.setAddFieldValues(addFieldsArr)

        return res.json(id);
    }

    async getAll(reg, res) {
        const items = await Item.findAll();
        return res.json(items);
    }

    async getOne(reg, res) {
        const {id} = reg.params;
        const item = await Item.findOne({
            where: {id},
             include: [Tag, Comment, AddFieldValue]
        });
        return res.json(item);
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