var jwt = require('jsonwebtoken');

class Middleware{
    static checkUser(req, res, next) {
        const secret = "123!@#ABC";
        const authHeader = req.headers["authorization"];
        if (!authHeader){
            return res.sendStatus(401);
        }
        
        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer"){
            return res.sendStatus(401);
        }

        jwt.verify(token, secret, function (err, data) {
            req.user = data;
            if (err){
                return res.sendStatus(401);
            }
            else next();
        });
    }
}

module.exports = Middleware;