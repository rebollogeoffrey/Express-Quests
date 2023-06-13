const database = require("./database");

const getUsers = (req, res) => {
    database
        .query("select * from users")
        .then(([movies]) => {
            res.json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving data from database");
        });
};;

const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);

    database
        .query("select * from users where id = ?", [id])
        .then(([movies]) => {
            if (movies[0] != null) {
                res.json(movies[0]);
            } else {
                res.status(404).send("Not Found");
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving data from database");
        });
};

const getUsersByLastName = (req, res) => {
    const lastname = req.params.lastname;

    database
        .query("select * from users where lastname = ?", [lastname])
        .then(([movies]) => {
            if (movies[0] != null) {
                res.json(movies[0]);
            } else {
                res.status(404).send("Not Found");
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving data from database");
        });
};

const getUsersByParm = (req, res) => {
    const parm = req.params.parm;

    if (parm > 0) {
        database
            .query("select * from users where id = ?", [parm])
            .then(([movies]) => {
                if (movies[0] != null) {
                    res.json(movies[0]);
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
            .then(([movies]) => {
                if (movies[0] != null) {
                    res.json(movies[0]);
                } else {
                    res.status(404).send("Not Found");
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error retrieving data from database");
            });
    }
};


const postUser = (req, res) => {
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
};


module.exports = {
    getUsers,
    getUsersById,
    getUsersByLastName,
    getUsersByParm,
    postUser
};
