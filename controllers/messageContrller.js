const validate = require('../helpers/validator')
const response = require('../helpers/response')
const messageTable = require('../models/messageModel')
const { Op } = require('sequelize')
const message = require('../models/messageModel')


//store messages in database
const storeMessages = async(req, res) =>{
    try{
   
      const {message, senderId, reciepenId} = req.body
      console.log(message)
      const data={
        message:message,
        reciepenid:reciepenId,
        senderid:senderId
      }
      const rules ={
        message:'required',
        reciepenid:'required|integer',
        senderid:'required|integer'
      }
  
      const validationResponse = await validate(data,rules)
      console.log(validationResponse)
      if(validationResponse.status === 0){
        console.log("from failed",data)
        return response.failed(res,validationResponse.message, null)
      }
      if(validationResponse.status === 1){
        console.log(data)
        const storeMesaages = await messageTable.create({senderid:senderId, receiverid:reciepenId, message:message })
        return response.success(res,"soted in daabse",data)
      }
  
     }catch(error){
      console.log(error)
      return response.serverError(res,null,error)
    }
  }

  //retrive messages
  const retriveMessages = async (req,res) =>{
    try{
        const {senderId, receiverId} = req.query;
        console.log(senderId)
        const data = {
            senderid:senderId,
            reciepenid:receiverId
        }
        const rules ={
            senderid:'required|integer',
            reciepenid:'required|integer'
        }

        const validationResponse = await validate (data,rules)
        if(validationResponse.status === 0){
            return response.failed(res,validationResponse.message,null)
        }
        if(validationResponse.status === 1){
          
            const findmessages = await messageTable.findAll({where:{[Op.or]: [ {senderid:senderId,receiverid:receiverId},{senderid:receiverId,receiverid:senderId}]}})
            if(findmessages){
                return response.success(res,null,findmessages)
            }
        }

    }catch(error){
          return response.serverError(res,null,{error:error})

    }
  }

  //delete messages
  const deletemessage = async (req,res) =>{
    try{
      console.log("HIT API")
      const {id} = req.params;
      console.log(id)
      const validationResponse = await validate({id:id}, {id:'required|integer'})
      if(validationResponse.status === 0){
        console.log(validationResponse)
        return response.failed(res,validationResponse.message)
      }
      if(validationResponse.status === 1){
        const deletemessage = messageTable.destroy({where:{id:id}})
        if(!deletemessage) {
          return response.failed(res,"failed to delete the message")
        }
        return response.success(res,"message deleted")
      }

      return response.failed(res, "failed to delete the message")
    }catch(error){
      console.log(error)
      return response.serverError(res,"server error")
    }
  }

  //update the message
  const updateMessage = async (req,res) =>{
    try{
    const {messagedId} = req.params
    const {newMessage} = req.body
   const data ={
    id:messagedId,
    message:newMessage
   }
   const rules={
    id:'required|integer',
    message:'required|string'
   }
   console.log("hit api")

    const validationResponse = await validate(data,rules)
    if(validationResponse.status === 0){
      console.log("not okay")
      return response.failed(res,validationResponse.message)
    }
    if(validationResponse.status === 1){
      const updatedMessage= await messageTable.update({message:newMessage},{where:{id:messagedId}})

      console.log(update)
      return response.success(res,"Message edit successfully",updatedMessage)
    }
    return response.failed(res,"failed to update the message")

    }catch(error){
      console.log(error)
      return response.serverError(res,"server error")
    }
  }

  module.exports = {storeMessages, retriveMessages, deletemessage, updateMessage}