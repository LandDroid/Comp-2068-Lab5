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
    console.log(req.body);
    req.flash("success", "This hero was registered successfully");
    res.redirect(`/superheroes/${superhero.id}`);
  } catch (error) {
    req.flash("danger", "There was an issue fetching the superheroes list.");
    res.redirect("/superheros/new");
  }
};

exports.edit = async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);

    res.render(`${viewPath}/edit`, {
      pageTitle: "",
      formData: superheroes,
    });
  } catch (error) {
    req.flash("danger", "There was an issue fetching the superheroes list");
    res.redirect("/");
  }
};

exports.update = async (req, res) => {
  try {
    await Superhero.validate(req.body);
    await Superhero.updateOne({ _id: req.body.id }, req.body);

    let superhero = await Superhero.findById(req.body.id);
    if (!superhero) throw new Error("Superhero could not be found");

    const attributes = { ...req.body };
    await Superhero.validate(attributes);
    await Superhero.findByIdAndUpdate(attributes.id, attributes);

    req.flash("success", "This hero was updated successfully");
    res.redirect(`/superheroes/${req.body.id}`);
  } catch (error) {
    req.flash("danger", "There was an issue fetching the superheroes list");
    res.redirect(`/superhoroes/${req.body.id}/edit`);
  }
};
