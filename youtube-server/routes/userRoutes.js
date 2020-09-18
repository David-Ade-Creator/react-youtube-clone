import express from "express";
import User from '../models/userModels';
import { isAuth, getToken} from '../util';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const {firstname, lastname, email, password} = req.body;
   
      User.findOne({
        email
      }).exec((err,doc)=>{
        if (doc) {
          return res.status(400).json({
            errors:'Email is taken'
          });
        }
      });
   
      const user = new User({
       firstname,
       lastname,
       email,
       password
     });
   
     user.save((err,user)=>{
       if (err) {
         console.log('Save error');
         return res.status(401).json({
           error: 'Error occurred'
         });
       } else {
         return res.json({
           success: true,
           message: user,
           message: 'Signup success'
         });
       }
   });   
});


   
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    
      // check if user exist
      User.findOne({
        email
      }).exec((err,user)=> {
        if (err || !user) {
          return res.status(400).json({
            errors: 'User with that email does not exist. Please signup'
          });
        }
        //authenticate
        if(!user.authenticate(password)) {
          return res.status(400).json({
            error: 'Email and password do not match'
          });
        }
  
        return res.json({
          user:{
            _id : user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token: getToken(user),
          },
    });
  });
});


router.put('/:id', isAuth, async (req, res) => {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (user) {
          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;
          const updatedUser = await user.save();
          res.send({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: getToken(updatedUser),
          });
        } else {
          res.status(404).send({ message: 'User Not Found' });
        }
    });

export default router;