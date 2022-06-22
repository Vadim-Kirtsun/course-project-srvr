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
        if (!name || !email || !password) {
            return next(ApiError.badRequest('Неправильный name, email или password!'));
        }

        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует!'));
        }

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
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal("Указан неверный пароль!"));
        }

        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});

    };

    async check(reg, res) {
        const token = generateJwt(reg.user.id, reg.user.email, reg.user.role);
        return res.json({token});
    };

    async getUsers(reg, res) {
        const users = await User.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        return res.json(users);
    }

    async blockUser(reg, res) {
        const selectedIds = reg.body;
        const response = await User.findAll({
            where: {id: selectedIds}
        }).then((result, err) => {
            if (result) {
                result.forEach(u => {
                    u.blocked = true;
                    u.save();
                })
                return {message: "All selected users had been blocked"};
            }
            if (err) {
                return {err: err};
            }
        });
        return res.json(response);
    }

    async unblockUser(reg, res) {
        const selectedIds = reg.body;
        const response = await User.findAll({
            where: {id: selectedIds}
        }).then((result, err) => {
            if (err) {
                return {err: err};
            }

            if (result) {
                result.forEach(u => {
                    u.blocked = false;
                    u.save();
                })
                return {message: "All selected users had been unblocked"};
            }
        });
        return res.json(response);
    }

    async deleteUser(reg, res) {
        const selectedIds = reg.body;
        const user = await User.destroy({
            where: {id: selectedIds}
        }).then((result, err) => {
            if (err) {
                return {err: err};
            }
            if (result) {
                return {message: "All selected users had been deleted"};
            }
        });
        return res.json(user);
    }

    async changeRole(reg, res) {
        const {id, role} = reg.body;
        const response = await User.findOne({
            where: {id: id}
        }).then((result, err) => {
            if (err) {
                return {err: err};
            }
            if (result) {
                result.role = role;
                result.save();
            }

            return {message: "User role had been changed"};
        });
        return res.json(response);
    }
}




module.exports = new UserController();