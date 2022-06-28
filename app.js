var express = require('express');
var { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
var path = require('path');
const session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
require('dotenv').config({ path: './.env'});
const connectDB = require('./config/db');

var app = express();

connectDB();
// import routes
var indexRouter = require('./routes/index');
var checkoutRouter = require('./routes/checkout');
var resultRouter = require('./routes/result');


const MongoStore = require('connect-mongo');



// set up handlebars
app.engine('.hbs', engine({ handlebars: allowInsecurePrototypeAccess(Handlebars), defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

Handlebars.registerHelper("if_zero", function(conditional, options) {
    if (conditional) {
      return options.fn(this);
    }
});

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
    cookie: {maxAge: 180 * 60 * 1000}
}));



app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/checkout', checkoutRouter);
app.use('/result', resultRouter);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});


module.exports = app;