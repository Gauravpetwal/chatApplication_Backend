const success = (res,message,data) =>{
    return res.status(201).json({message:message,data:data})
}
 
const failed = (res,message,data) =>{
    return res.status(400).json({message:message, data:data})
}

const serverError =(res,message,data)=>{
    return res.status(500).json({message:message,data:data})
}

module.exports ={success,failed,serverError}