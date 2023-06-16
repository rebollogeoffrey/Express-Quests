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


    postUser: (req, res) => {
        const { firstname, lastname, email, city, language } = req.body;

        database
            .query(
                "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
                [firstname, lastname, email, city, language]
            )
            .then(([result]) => {
                const userIdInserted = result.insertId;
                res.location(`/api/movies/${userIdInserted}`).sendStatus(201);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error saving the user");
            });
    },

    putUser: (req, res) => {
        const { firstname, lastname, email, city, language } = req.body;
        const id = parseInt(req.params.id);

        database
            .query(
                "UPDATE users SET firstname=?, lastname=?, email=?, city=?, language=? WHERE id=?",
                [firstname, lastname, email, city, language, id]
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
    },
    deleteUser: (req, res) => {
        const id = parseInt(req.params.id);

        database
            .query(
                "DELETE FROM users WHERE id=?",
                [id]
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
    },
}


module.exports = userHandlers;
