const { adminModel } = require("../../models/adminAuthModel")

let adminLogin= async (req,res)=>{
    let obj
    let {adminEmail,adminPassword}=req.body
    
    let checkAdmin=await  adminModel.findOne({adminEmail:adminEmail})
    console.log(checkAdmin)
    if(checkAdmin)
    {
      let password=checkAdmin.adminPassword
      if(adminPassword==password)
      {
        obj={
            status:1,
            msg:'successfully login'
        }
      }
      else{
        obj={
            status:0,
            msg:'please fill valid password'
        }
      }
      res.send(obj)
    }
    else{
       obj={
        status:0,
        msg:'please fill valid email'
       }
       res.send(obj)
    }
}

module.exports={adminLogin}