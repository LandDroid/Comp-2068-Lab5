const {
  new: _new,
  index,
  show,
  create,
  edit,
  update,
} = require("../controllers/SuperheroesController");

module.exports = (router) => {
  router.get("/superheroes", index);
  router.get("/superheroes/new", _new);
  router.post("/superheroes", create);
  router.get("/superheroes/:id", show);
  router.get("/superheroes/:id/edit", edit);
  router.post("/superheroes/update", update);
};
