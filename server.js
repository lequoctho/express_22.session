// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
require('dotenv').config();

const express = require("express");
const shortid = require("shortid");

const route500 = require("./routes/500.route");
const routeUser = require("./routes/user.route");
const routeTransaction = require("./routes/transaction.route");
const routeBook = require("./routes/book.route");
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth.route');
const cartRoute = require('./routes/cart.route');
const apiUserRoute = require('./api/routes/login.route');
const shopRoute = require('./routes/shop.route');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

const app = express();

const db = require("./db");

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET));


app.use('/500', route500);

app.use('/users',authMiddleware.requireAuth ,routeUser);

app.use('/transactions',authMiddleware.requireAuth , routeTransaction);

app.use('/books', routeBook);

app.use('/auth', authRoute);

app.use('/cart', cartRoute);

app.use('/api/login', apiUserRoute);

app.use('/shop', shopRoute);

app.use(express.static('public'));

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT || 3000);
});
