//import bcrypt from 'bcrypt';
import Model from '../model/Model.js';
import jwt from 'jsonwebtoken';


export const login = async (req, res, next) => {
  let user = req.body

  const User = await Model.readAdmin(user.email)

  if (!User) res.sendStatus(405);

  try {
    //if (await bcrypt.compare(user.password, User.password)) { Retirei Senha Criptografada ( não é o foco)
    if(user.password === User.password){
      const token = jwt.sign({id: User.id}, process.env.JWT_SECRET);

      const { password: password, ...validUser} = User

      const expiryDate = new Date(Date.now() + 3600000);
      res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(validUser);
    } else {
      return res.sendStatus(401);
    }
  } catch (e) {
    console.log(e)
    next(e);
  }   
}

export const logout = async(req, res) => {
  res.clearCookie('access_token').status(200).json('Logout concluido');
}


