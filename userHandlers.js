const database = require("./database");

const userHandlers = {

    getUsers: (req, res) => {
        let sql = "select * from users";
        const sqlValues = [];

        if (req.query.city != null) {
            sql += " where city = ?";
            sqlValues.push(req.query.city);

            if (req.query.language != null) {
                sql += " and language = ?";
                sqlValues.push(req.query.language);
            }
        } else if (req.query.language != null) {
            sql += " where language = ?";
            sqlValues.push(req.query.language);
        }


        database
            .query(sql, sqlValues)
            .then(([users]) => {
                if (users != null) {
                    res.json(users);
                } else {
                    res.status(200).send("Not Found");
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error retrieving data from database");
            });
    },

    getUsersById: (req, res) => {
        const id = parseInt(req.params.id);

        database
            .query("select * from users where id = ?", [id])
            .then(([users]) => {
                if (users[0] != null) {
                    res.json(users[0]);
                } else {
                    res.status(404).send("Not Found");
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error retrieving data from database");
            });
    },

    getUsersByLastName: (req, res) => {
        const lastname = req.params.lastname;

        database
            .query("select * from users where lastname = ?", [lastname])
            .then(([users]) => {
                if (users[0] != null) {
                    res.json(users[0]);
                } else {
                    res.status(404).send("Not Found");
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error retrieving data from database");
            });
    },

    getUsersByParm: (req, res) => {
        const parm = req.params.parm;

        if (parm > 0) {
            database
                .query("select * from users where id = ?", [parm])
                .then(([users]) => {
                    if (users[0] != null) {
                        res.json(users[0]);
                    } else {
                        res.status(404).send("Not Found");
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send("Error retrieving data from database");
                });
        }
        else {
            database
                .query("select * from users where lastname = ?", [parm])
                .then(([users]) => {
                    if (users[0] != null) {
                        res.json(users[0]);
                    } else {
                        res.status(404).send("Not Found");
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send("Error retrieving data from database");
                });
        }
    },


    createUser: (req, res) => {
        const { firstname, lastname, email, city, language, hashedPassword } = req.body;

        database
            .query(
                "INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)",
                [firstname, lastname, email, city, language, hashedPassword]
            )
            .then(([result]) => {
                const userIdInserted = result.insertId;
                res.location(`/api/users/${userIdInserted}`).sendStatus(201);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error saving the user");
            });
    },

    updateUser: (req, res) => {
        const { firstname, lastname, email, city, language, hashedPassword } = req.body;
        const userId = parseInt(req.params.id);
        const tokenId = req.payload.sub;

        if (userId === tokenId) {
            database
                .query(
                    "UPDATE users SET firstname=?, lastname=?, email=?, city=?, language=?, hashedPassword=? WHERE id=?",
                    [firstname, lastname, email, city, language, hashedPassword, userId]
                )
                .then(([result]) => {
                    if (result.affectedRows === 0) {
                        res.status(404).send("Not Found");
                    } else {
                        res.sendStatus(204);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send("Error updating the user");
                })
        }
        else {
            res.sendStatus(403);
        }
    },

    deleteUser: (req, res) => {
        const userId = parseInt(req.params.id);
        const tokenId = req.payload.sub;

        if (userId === tokenId) {
            database
                .query(
                    "DELETE FROM users WHERE id=?",
                    [userId]
                )
                .then(([result]) => {
                    if (result.affectedRows === 0) {
                        res.status(404).send("Not Found");
                    } else {
                        res.sendStatus(204);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send("Error updating the user");
                })
        }
        else {
            res.sendStatus(403);
        }
    },

    getUserByEmailWithPasswordAndPassToNext: (req, res, next) => {
        const { email } = req.body;

        database
            .query(
                "SELECT * FROM users WHERE email=?",
                [email]
            )
            .then(([users]) => {
                if (users[0] != null) {
                    req.user = users[0];
                    next();
                } else {
                    res.sendStatus(401);
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error finding the Credentials");
            })
    },
}


module.exports = userHandlers;
