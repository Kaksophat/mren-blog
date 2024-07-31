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
   return  next(errorhanddler(400, "all filed are require"));
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

export const google = async(req,res,next)=>{
  const {name,email,googlePhotoUrl} = req.body

  try {
    const user = await User.findOne({email})

    if(user){
      const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
      const {password:_, ...rest} = user._doc
       res.status(200).cookie("access-token",token,{
         httpOnly:true
       }).json(rest)
    }else{
      const generatepassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)

      const hashpassword = await bcrypt.hash(generatepassword,10)

      const newuser = await User.create({
        username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email:email,
        password: hashpassword,
        profilepic: googlePhotoUrl,
      })
      const token = jwt.sign({id:newuser._id}, process.env.JWT_SECRET)
      const {password:_, ...rest} = newuser._doc
       res.status(200).cookie("access-token",token,{
         httpOnly:true
       }).json(rest)    

    }
  } catch (error) {
    next(error)
  }
}
