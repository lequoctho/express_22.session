var count = 0;

module.exports.transactionCookie = (req, res, next) => {
  console.log(req.cookies);
  next();
}