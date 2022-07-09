const {Like} = require('../models/models');


class LikeController {
    async updateLike(reg, res) {
        const {userId, itemId} = reg.body;
        const like = await Like.findOne({where: {userId, itemId}});
        if (like) {
             await Like.destroy({where: {userId, itemId}});
        } else {
             await Like.create({userId, itemId})
        }
    }
}
module.exports = new LikeController();