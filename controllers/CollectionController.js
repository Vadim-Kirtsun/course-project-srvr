const {Collection, AddField} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class CollectionController {

    async create(reg, res, next) {
        console.log(reg.body);
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
            where: {id}
        });
        return res.json(collection);
    }

    async delete(reg, res) {

    }
}

module.exports = new CollectionController();