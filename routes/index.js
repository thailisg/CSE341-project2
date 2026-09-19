const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/figures', require('./figures'));
router.use('/artifacts', require('./artifacts'));

module.exports = router;