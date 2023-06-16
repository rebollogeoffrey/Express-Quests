const database = require("./database");

const movieHandlers = {
  getMovies: (req, res) => {
    database
      .query("select * from movies")
      .then(([movies]) => {
        res.json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  },

  getMovieById: (req, res) => {
    const id = parseInt(req.params.id);

    database
      .query("select * from movies where id = ?", [id])
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
  },

  postMovie: (req, res) => {
    const { title, director, year, color, duration } = req.body;

    database
      .query(
        "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
        [title, director, year, color, duration]
      )
      .then(([result]) => {
        const movieIdInserted = result.insertId;
        res.location(`/api/movies/${movieIdInserted}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the movie");
      });
  },

  putMovie: (req, res) => {
    const { title, director, year, color, duration } = req.body;
    const id = parseInt(req.params.id);

    database
      .query(
        "UPDATE movies SET title=?, director=?, year=?, color=?, duration=? WHERE id=?",
        [title, director, year, color, duration, id]
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
        res.status(500).send("Error updating the movie");
      })
  },
  deleteMovie: (req, res) => {
    const id = parseInt(req.params.id);

    database
      .query(
        "DELETE FROM movies WHERE id=?",
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
        res.status(500).send("Error deleting the movie");
      })
  },
}


module.exports = movieHandlers;
