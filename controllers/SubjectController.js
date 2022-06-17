const { Subject } = require('../models/models');
const ApiError = require('../error/ApiError');


class SubjectController {

    async getAll(reg, res) {
        const subjects = await Subject.findAll();
        return res.json(subjects);
    }
}

module.exports = new SubjectController();