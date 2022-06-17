const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if(!token){
    return res.status(401).send({ message: 'No token'});
  }
  try {
     const payload = jwt.decode(token, config.get('jwtSecret'));
     req.userId = payload.user.id;
     next();
  } catch (error) {
    return res.status(401).send({ message: 'Token is invaid'});    
  }
}
