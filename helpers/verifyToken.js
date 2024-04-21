const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.ucbi_token;

  if (token) {
    jwt.verify(token, TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect('/login');
        // res.json(this.responseObject({ auth: false }, false));
      } else {
        req.userId = decodedToken.id;
        next();
      }
    })
  } else {
    console.log('no token');
    res.redirect('/login');
  }
}