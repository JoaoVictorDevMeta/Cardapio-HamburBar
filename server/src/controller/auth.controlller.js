//import bcrypt from 'bcrypt';
import Model from '../model/Model.js';
import jwt from 'jsonwebtoken';

class Login {
  login = async (req, res, next) => {
    let user = req.body

    const User = await Model.readAdmin(user.email)

    if (!User) res.sendStatus(405);

    try {
      //if (await bcrypt.compare(user.password, User.password)) { Retirei Senha Criptografada ( não é o foco)
      if(user.password === User.password){
        //req.session.data = User;
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
        const { password: hashedPassword, ...validUser} = User
        const expireDate = new Date( Date.now() + 3600000);
        res
        .cookie('access_token', token, {httpOnly: true, expires: expireDate})
        .status(200)
        .json(validUser);
        //return res.sendStatus(200);
      } else {
        return res.sendStatus(401);
      }
    } catch (e) {
      console.log(e)
      next(e);
    }   
  }

  logout = async(req, res) => {
    res.clearCookie('access_token').status(200).json('Logout concluido');
  }
}

const AuthLogin = new Login();

export default AuthLogin