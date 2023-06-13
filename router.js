const express = require("express");

const router = express.Router()

// IMPORT
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

// GET
router.get("/api", (req, res) => { res.status(200).send("Welcome to the API, add either /movies or /users for more info"); }
);
router.get("/api/movies", movieHandlers.getMovies);
router.get("/api/movies/:id", movieHandlers.getMovieById);

router.get("/api/users", userHandlers.getUsers);
// router.get("/api/users/:id", userHandlers.getUsersById);
// router.get("/api/users/:lastname", userHandlers.getUsersByLastName);
router.get("/api/users/:parm", userHandlers.getUsersByParm);

// POST
router.post("/api/movies", movieHandlers.postMovie);
router.post("/api/users", userHandlers.postUser);

// PUT
router.put("/api/movies/:id", movieHandlers.putMovie);
router.put("/api/users/:id", userHandlers.putUser);

module.exports = { router };