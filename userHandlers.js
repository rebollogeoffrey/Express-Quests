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
    console.log(req.params);
    console.log(lastname);
    console.log(typeof lastname);

    if (lastname > 0) { console.log("PPPUUUUUUUUUUUUUUUUUUUUUu"); }

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



module.exports = {
    getUsers,
    getUsersById,
    getUsersByLastName,
    getUsersByParm
};
