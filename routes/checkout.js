var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
const stripe = require('stripe')(process.env.STRIPE_SECRETE_KEY);


const DOMAIN = 'http://localhost:'.concat(process.env.PORT)

router.get('/', function(req, res, next){
    var cart = new Cart(req.session.cart);
    res.render('shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice, style: 'checkout'});
});


router.post('/', async (req, res) => {
    var cart = new Cart(req.session.cart);
    
    var price_arr = []

    console.log(req.body.price_id);
    console.log(req.body.prod_qty);
    if (cart.totalQty < 2 || (cart.totalQty < req.body.price_id.length)){
      price_arr.push({'price': req.body.price_id, 'quantity': parseInt(req.body.prod_qty)});
      
    }else{
      for (var i = 0; i < req.body.price_id.length; ++i){
        if (parseInt(req.body.prod_qty[i]) > 0){
          price_arr.push({'price': req.body.price_id[i], 'quantity': parseInt(req.body.prod_qty[i])});
        }
        
    }
    }
    


    const session = await stripe.checkout.sessions.create({
      line_items: price_arr,
      mode: 'payment',
      success_url: `${DOMAIN}/result/success`,
      cancel_url: `${DOMAIN}/result/cancel`,
      automatic_tax: {enabled: true},
    });

    res.redirect(303, session.url);
  });

module.exports = router;




