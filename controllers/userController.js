const response = require('../helpers/response')
const userTable = require('../models/userModel')
const validate = require('../helpers/validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const RestPassword = require('../helpers/forgetPassword')
const otpTable = require('../models/otp')
const tamplateTable = require('../models/tamplate')
const Handlebars = require("handlebars");



//signup the user
const singnup = async(req,res) => {
  try{
    const {userName, userEmail, userPassword}= req.body
    const data ={
      name:userName,
      email:userEmail,
      password:userPassword
    }
    const rules={
      name:'required|between:1,40',
      email:'required|email|isUnique:users,email',
      password:'required|between:8,40'
    }

    const validationResponse = await validate(data,rules)
    if(validationResponse.status === 0){
      return response.failed(res,validationResponse.message,null)
    }
    if(validationResponse.status === 1){
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      const registerUser = await userTable.create({userName:userName, email:userEmail, Password:hashedPassword })

      if(registerUser.length === 0){
         return response.failed(res,"user not registerd", null)
      }
      return response.success(res,"user regitered successfully", null)
    }

  }catch(error){
    return response.serverError(res,error,null)
  }
}

//signin the user
const signIn = async (req, res) => {

      try { 
        const {userEmail, userPassword}= req.body
       const data = {
        Email: userEmail,
       Password: userPassword,
      };
      const rules = {
        Email: "required|email|isExist:users,email",
        Password: `required`,
      };
  
      const validationResponse = await validate(data, rules);
       if (validationResponse.status === 0) {
        return response.failed(res,validationResponse.message,null) 
      }
  
      const user = await userTable.findOne({ where: { email: userEmail } });
      const confirmPassword = await bcrypt.compare(userPassword, user.Password);
  
      if (!confirmPassword) {
        return response.failed(res,"Password is incorrect",null)    
      }
      
     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_key, { expiresIn: "4h", });
     return response.success(res,validationResponse.message,{token: token , user:user.userName})
    }
     catch (error) {
      console.log(error)
       return response.serverError(res,"due to server Error",(error))
      }
  };

//getting all usre
const allUser = async (req,res) =>{
    try{
        const {id} = req.user
        console.log("token id", id)
  
    const user = await userTable.findAll({where:{id:{[Op.ne]: id}}})
    if(user.length === 0){
        return response.failed(res,"There is no user",null)
    }
    return response.success(res,"All user",user)
    }catch(error){
      console.log(error)
        return response.serverError(res,error,null)
    } 
}


//forget password method
const forgetPassword = async (req,res) =>{
  try{
     const {email} = req.body
    const data = {Email:email}
    const rules = {Email:'required|email|isExist:users,email'}

    const validationResponse = await validate(data,rules)
    if(validationResponse.status === 0){
            return response.failed(res,validationResponse.message,null)
    }
    if(validationResponse.status === 1){
      const otp = Math.floor(1000 + Math.random() * 9000);
      otpTable.create({ email: email, otp: otp });
      const template = await tamplateTable.findByPk(1)
      const htmlTemplate = Handlebars.compile(template.content);
      const htmlData = htmlTemplate({"otp":otp})      
      RestPassword(email,htmlData)   

      return response.success(res,"OTP has been sent to your email account")
    }

  }catch(error){
    console.log(error)
    return response.serverError(res,error,error)
  }
}

//resent password method
const resetPassword = async (req,res) =>{
  try{
   const {otp,newPassword} = req.body
   const data ={
    Otp:otp,
    NewPassword: newPassword
   }

   const rules ={
    Otp:'required|integer',
    NewPassword:'required|string|between:8,30'
   }

   const validationResponse = await validate (data,rules)
   if (validationResponse.status === 0){
    return response.failed(res,validationResponse.message)
   }
   if(validationResponse.status === 1){
  const userotp = await otpTable.findOne({where:{otp:otp}})  
  console.log("userotp", userotp)
  if(!userotp){
    console.log("if not otp")
    return response.failed(res,"Wrong OTP",null)
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const userEmail = userotp.email;
  const resetPass = await userTable.update({Password:hashedPassword},{where:{email:userEmail}})
  console.log("reset pass", resetPass)
  if(resetPass){
     console.log("before update")
    await otpTable.destroy({where:{otp:otp}})
    console.log("updated")
    return response.success(res,"Password has been reset",null)


  }
 }
 return response.failed(res,"Passwotd does not change")

  }catch(error){
    console.log(error)
    return response.serverError(res,"server Error",)
  }
}
module.exports = {allUser,signIn,singnup,forgetPassword, resetPassword}