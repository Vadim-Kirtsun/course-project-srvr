const {AddField} = require('../models/models');
const ApiError = require('../error/ApiError');

class AddFieldController {

    async create(reg, res) {
        const {collectionId,additionalField} = reg.body;
        let addField;
        if(additionalField.id === undefined){
            addField = await AddField.create({name: additionalField.name, type: additionalField.type, collectionId:collectionId});
        }else{
            addField = await AddField.update({name: additionalField.name, type: additionalField.type}, {where: {id:additionalField.id}});
        }

        return res.json(addField);
    }

    async getAll(reg, res) {
        const addFields = await AddField.findAll();
        return res.json(addFields);
    }

    async delete(reg, res) {

    }
}

module.exports = new AddFieldController();