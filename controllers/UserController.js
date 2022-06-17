const {User} = require('../models/models');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
};

class UserController {
    async registration(reg, res, next) {
        const {name, email, password} = reg.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Неправильный email или password!'));
        };
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует!'));
        };
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await User.create({name, email, password: hashPassword});
        console.log(user);
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    };

    async login(reg, res, next) {
        const {email, password} = reg.body;
        const user = await User.findOne({where: {email}});
        if (!user) {
            return next(ApiError.internal("Пользователь не найден!"));
        };
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal("Указан неверный пароль!"));
        };
        const token = generateJwt(user.id, user.email, user.password);
        return res.json({token});

    };

    async check(reg, res, next) {
        const token = generateJwt(reg.user.id, reg.user.email, reg.user.role);
        return res.json({token});
    };
};


module.exports = new UserController();