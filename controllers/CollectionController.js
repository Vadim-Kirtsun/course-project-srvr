const {Collection, AddField, Item} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class CollectionController {

    async create(reg, res, next) {
        try{
            const {id,name, description, subject, image} = reg.body;
           let collection;
            if(id === undefined){
                collection = await Collection.create({name, description, subject, userId: reg.user.id});
            }else{
                collection = await Collection.update({name, description, subject}, {where: {id}});
            }
            /*let fileName = {};
            if(image) {
                fileName = uuid.v4() + ".jpg";
                image.mv(path.resolve(__dirname, '..', 'static', fileName))
            }*/
            return res.json(collection);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(reg, res) {
        const collections = await Collection.findAll({include: AddField});
        return res.json(collections);
    }

    async getOne(reg, res) {
        const {id} = reg.params;
        const collection = await Collection.findOne({
            where: {id},
            include: [Item,AddField]
        });
        return res.json(collection);
    }

    async delete(reg, res) {
        const {id} = reg.body;
        const collection = await Collection.destroy({
            where: {id}
        }).then((result, err) => {
            if (err) {
                return {err: err};
            }
            if (result) {
                return {message: "CollectionId had been deleted"};
            }
        });
        return res.json(collection);
    }
}

module.exports = new CollectionController();