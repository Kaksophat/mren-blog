import User from "../model/usermodel.js";
import bcrypt, { compareSync } from "bcrypt";
import { errorhanddler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
   return next(errorhanddler(400, "all field are require"));
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hash,
    });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
     next(errorhanddler(400, "all filed are require"));
  }
  try {
    const user = await User.findOne({ email })
    
    if (!user) {
     return next(errorhanddler(404, "User not found"));
    }
    const vaildpassword = await bcrypt.compare(password,user.password)
    if(!vaildpassword){
      return next(errorhanddler(401,"worng password"))
    }

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
   const {password:_, ...rest} = user._doc
    res.status(200).cookie("access-token",token,{
      httpOnly:true
    }).json(rest)
  
  } catch (error) {
    next(error)
  }
};
