// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const shortid = require("shortid");

const routeUser = require("./routes/user.route");
const routeTransaction = require("./routes/transaction.route");
const routeBook = require("./routes/book.route");

const app = express();

const db = require("./db");

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



app.use('/users', routeUser);

app.use('/transactions', routeTransaction);

app.use('/books', routeBook);

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
