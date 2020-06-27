const viewPath = "superheroes";
const Superhero = require("../models/superhero");

exports.index = async (req, res) => {
  try {
    const superheroes = await Superhero.find().sort({ updatedAt: "desc" });

    res.render(`${viewPath}/index`, {
      pageTitle: "",
      superheroes: superheroes,
    });
  } catch (error) {
    req.flash("danger", "There was an issue fetching the superheroes list");
    res.redirect("/");
  }
};

exports.show = async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);

    res.render(`${viewPath}/show`, {
      pageTitle: "",
      superhero: superhero,
    });
  } catch (error) {
    req.flash("danger", "There was an issue fetching the superheroes list");
    res.redirect("/");
  }
};

exports.new = (req, res) => {
  try {
    res.render(`${viewPath}/new`, {
      pageTitle: "",
    });
  } catch (error) {
    req.flash("danger", "There was an issue fetching the superheroes list");
    res.redirect("/");
  }
};

exports.create = async (req, res) => {
  try {
    const superhero = await Superhero.create(req.body);

    req.flash("success", "This hero was registered successfully");
    res.redirect(`/superheroes/${superhero.id}`);
  } catch (error) {
    req.flash("danger", "There was an issue fetching the superheroes list");

    res.redirect("/");
  }
};

exports.edit = async (req, res) => {
  try {
    const superhero = await Superhero.findByIdAndUpdate(req.params.id);

    res.render(`${viewPath}/edit`, {
      pageTitle: "",
      formData: superhero,
    });
  } catch (error) {
    req.flash("danger", "There was an issue fetching the superheroes list");
    res.redirect("/");
  }
};

exports.update = async (req, res) => {
  try {
    await Superhero.validate(req.body);
    await Superhero.updateOne(req.body);

    req.flash("success", "This hero was updated successfully");
    res.redirect(`/superheroes/${req.body.id}`);
  } catch (error) {
    req.flash("danger", "There was an issue fetching the superheroes list");
    res.redirect("/");
  }
};
