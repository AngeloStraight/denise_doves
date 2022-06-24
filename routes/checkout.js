var express = require('express');
var router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRETE_KEY);


const DOMAIN = 'http://localhost:3000';

router.get('/', function(req, res, next){
    res.render('checkout', {style: 'checkout'});
});

router.post('/', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1KvDRvGvrFCFNDycxYkDfXsr',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${DOMAIN}/result/success`,
      cancel_url: `${DOMAIN}/result/cancel`,
      automatic_tax: {enabled: true},
    });
  
    res.redirect(303, session.url);
  });

module.exports = router;




