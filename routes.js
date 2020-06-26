const router = require('express').Router();

// Our resource routes
(require('./routes/pages'))(router);
(require('./routes/superheroes'))(router);

module.exports = router;