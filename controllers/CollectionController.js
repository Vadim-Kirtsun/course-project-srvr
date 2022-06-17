const {Collection} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class CollectionController {

    async create(reg, res, next) {
        console.log(reg);
        try{
            const {name, description} = reg.body;
            const {image} = reg.files;
            let  fileName = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '..', 'static', fileName))

            const collection = await Collection.create({name, description, image: fileName});
            return res.json(collection); 
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(reg, res) {
        const collections = await Collection.findAll();
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