const express = require("express");

const router = express.Router()

// IMPORT
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const validators = require("./validators");
const authenticators = require("./authenticators")


//PUBLIC
/////// GET
router.get("/api", (req, res) => { res.status(200).send("Welcome to the API, add either /movies or /users for more info"); }
);

router.get("/api/movies", movieHandlers.getMovies);
router.get("/api/movies/:id", movieHandlers.getMovieById);

router.get("/api/users", userHandlers.getUsers);
router.get("/api/users/:id", userHandlers.getUsersById);

/////// POST
router.post("/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext, authenticators.verifyPassword);
router.post("/api/users", validators.validateUser, authenticators.hashPassword, userHandlers.createUser);


router.use(authenticators.verifyToken);

// PRIVATE
/////// POST
router.post("/api/movies", authenticators.verifyToken, validators.validateMovie, movieHandlers.createMovie);

/////// PUT
router.put("/api/users/:id", validators.validateUser, authenticators.hashPassword, userHandlers.updateUser);
router.put("/api/movies/:id", validators.validateMovie, movieHandlers.updateMovie);

/////// DELETE
router.delete("/api/movies/:id", movieHandlers.deleteMovie);
router.delete("/api/users/:id", userHandlers.deleteUser);

module.exports = { router };