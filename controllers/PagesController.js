const viewPath = ('pages');

exports.home = (req, res) => {
  res.render(`${viewPath}/home`, {
    pageTitle: 'Lab 04 - Your Turn'
  });
};