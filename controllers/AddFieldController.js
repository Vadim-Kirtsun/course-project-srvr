const {AddField} = require('../models/models');


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
        const {id} = reg.body;
        const deletedField = await AddField.destroy({
            where: {id}
        }).then((result, err) => {
            if (err) {
                return {err: err};
            }
            if (result) {
                return {message: "Field had been deleted"};
            }
        });
        return res.json(deletedField);
    }
}

module.exports = new AddFieldController();