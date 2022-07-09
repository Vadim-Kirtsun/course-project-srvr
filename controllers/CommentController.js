const {Comment} = require('../models/models');



class CommentController {

    async create(reg, res) {
        const {id, content, author, avatar, userId, itemId} = reg.body;
        console.log(reg.body);
        /*if (id === undefined){
            const data = await Comment.create({content, author, avatar, userId, itemId});
            return res.json(data);
        }*/




    }

    async getAll(reg, res) {
        const comments = await Comment.findAll();
        return res.json(comments);
    }

    async getOne(reg, res) {

    }

    async delete(reg, res) {

    }
}

module.exports = new CommentController();