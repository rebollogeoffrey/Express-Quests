const express = require("express");

const router = express.Router()

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

router.get("/api", (req, res) => { res.status(200).send("Welcome to the API, add either /movies or /users for more info"); }
);
router.get("/api/movies", movieHandlers.getMovies);
router.get("/api/movies/:id", movieHandlers.getMovieById);

router.get("/api/users", userHandlers.getUsers);
// router.get("/api/users/:id", userHandlers.getUsersById);
// router.get("/api/users/:lastname", userHandlers.getUsersByLastName);
router.get("/api/users/:parm", userHandlers.getUsersByParm);

router.post("/api/movies", movieHandlers.postMovie);

module.exports = { router };