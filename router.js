const express = require("express");

const router = express.Router()

// IMPORT
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const validators = require("./validators");

// GET
router.get("/api", (req, res) => { res.status(200).send("Welcome to the API, add either /movies or /users for more info"); }
);
router.get("/api/movies", movieHandlers.getMovies);
router.get("/api/movies/:id", movieHandlers.getMovieById);

router.get("/api/users", userHandlers.getUsers);
router.get("/api/users/:id", userHandlers.getUsersById);

// POST
router.post("/api/users", validators.validateUser, userHandlers.postUser);
router.post("/api/movies", validators.validateMovie, movieHandlers.postMovie);

// PUT
router.put("/api/movies/:id", validators.validateMovie, movieHandlers.putMovie);
router.put("/api/users/:id", validators.validateUser, userHandlers.putUser);
router.put("/api/movies/:id", movieHandlers.deleteMovie);
router.put("/api/users/:id", userHandlers.deleteUser);

module.exports = { router };