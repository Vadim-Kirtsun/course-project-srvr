const {Like} = require('../models/models');


class LikeController {
    async createLike(reg, res) {
        const {userId, itemId} = reg.body;

        const liked = await Like.findOne({where: {userId, itemId}});
        if (liked) {
            return res.json({message: 'The user has already liked!'});
        }

        const like = await Like.create({userId, itemId})
            return res.json(like);
    }
}
module.exports = new LikeController();