const {Comment} = require('../models/models');



class CommentController {

    async create(reg, res) {
        const {id, text, userId, itemId} = reg.body;
        if (id === undefined){
            const data = await Comment.create({text, userId, itemId});
            return res.json(data);
        }
    }

    async getAll(reg, res) {
        const comments = await Comment.findAll();
        return res.json(comments);
    }

    async getAllByItem(reg, res) {
        const {itemId} = reg.params;
        const comments = await Comment.findAll({
            where: {itemId}
        });
        return res.json(comments);
    }

    async getOne(reg, res) {

    }

    async delete(reg, res) {

    }
}

module.exports = new CommentController();