const { home, about, thing } = require('../controllers/PagesController');

module.exports = router => {
  router.get('/', home);
};