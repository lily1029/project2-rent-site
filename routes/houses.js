var express = require('express');
var router = express.Router();
const houseCtrl = require('../controllers/houses')
//GET request to /houses
router.get('/', houseCtrl.index)

//GET request to /houses/new
router.get('/new', houseCtrl.new)

router.post('/', houseCtrl.create)


module.exports = router;