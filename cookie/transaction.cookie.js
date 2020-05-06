var count = 0;

module.exports.transactionCookie = (req, res, next) => {
  req.cookies.userId = count;
  console.log(req.cookies);
  count++;
  next();
}