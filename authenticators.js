const argon2 = require("argon2");
const jwt = require('jsonwebtoken');
require("dotenv").config();


const authenticators = {
    hashPassword: (req, res, next) => {
        const hashingOptions = {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 5,
            parallelism: 1,
        };

        argon2
            .hash(req.body.password, hashingOptions)
            .then((hashedPassword) => {

                req.body.hashedPassword = hashedPassword;
                delete req.body.password;


                next();
            })
            .catch((err) => {
                console.error(err);
                res.sendStatus(500);
            });
    },

    verifyPassword: (req, res) => {
        argon2
            .verify(req.user.hashedPassword, req.body.password)
            .then((result) => {
                if (result) {
                    const payload = { sub: req.user.id }
                    const secretKey = process.env.JWT_SECRET;
                    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

                    delete req.user.hashedPassword;
                    res.status(200).json({ User: req.user, Token: token });
                } else {
                    res.sendStatus(401);
                }
            })
            .catch((err) => {
                console.error(err);
                res.sendStatus(500);
            })
    },

    verifyToken: (req, res, next) => {
        try {
            const secretKey = process.env.JWT_SECRET;

            const header = req.get("Authorization");
            if (header == null) {
                throw new Error("Missing Header/Auth");
            }

            const [type, token] = header.split(" ");
            if (type != "Bearer") {
                throw new Error("Wrong type of Authorization");
            }

            req.payload = jwt.verify(token, secretKey);

            next();
        } catch (err) {
            console.error(err);
            res.sendStatus(401);
        }
    }


};

module.exports = authenticators;