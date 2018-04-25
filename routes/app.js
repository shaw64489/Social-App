// use require keyword to refer and use express module
const express = require('express');
// define router
var router = express.Router();


// GET - index and render index
router.get('/', (req, res, next) => {

        res.render('index.html');

});


// export router
module.exports = router;
