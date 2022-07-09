const jwt = require('jsonwebtoken');

module.exports = function (role) {
    return function (reg, res, next) {
        if (reg.method === "OPTIONS") {
            next();
        };
        try {
            const token = reg.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({message: "User not authorized!"});
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded.role !== role) {
                return res.status(403).json({message: "No access!"})
            }
            reg.user = decoded;
            next();
        }catch (e) {
            res.status(401).json({message: "User not authorized!"});
        }
    }
}
