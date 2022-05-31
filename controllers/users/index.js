const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const userController = {
  test: (req, res) => {
    res.status(200).send("welcome to User controller");
  },
  create: async (req, res) => {
    try{
      const { email, password } = req.body;

      const user = new User({
        email, 
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      
      const result = await user.save();

      const payload ={
        user: {
          id: result._id
        }
      };

      const token = await jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 240000});

      res.status(200).send({
        message: "User created",
        data: result,
        token: token
      });
    }
    catch(err){
      res.status(400).send({
        message: err.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const {
        email,
        password
      } = req.body;
      
      let user = await User.findOne({ email });
      if(!user){
        return res.status(400).send({ message: 'Invalid Credentials'});
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch){
        return res.status(400).send({ message: 'Invalid Credentials'});
      }

      const payload = {
        user: {
          id: user._id
        }
      };
      const token = await jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 240000});

      return res.status(200).send({
        message: 'LoggedIn Successfully',
        token,
      })
    } catch (error) {
      return res.status(400).send({ message: 'Some Error Occurred'});
    }

  }
}

module.exports = userController;



