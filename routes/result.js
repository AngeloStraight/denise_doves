var express = require('express');
var router = express.Router();

router.get('/success', function(req, res, next){
    console.log("success get function");
    console.log(req.session)
    req.session.cart = {}
    res.render('success', {style: 'style.css', });
});

router.get('/cancel', function(req, res, next){
    res.render('cancel', {style: 'style.css', });
});

module.exports = router;