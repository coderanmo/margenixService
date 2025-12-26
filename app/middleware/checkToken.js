let  jwt = require("jsonwebtoken");

let  checkToken= async (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1]
    let resObj
    if (token) {
        let decoded = jwt.verify(token, process.env.TOKENKEY)
        if(decoded)
        {
            let {id}=decoded
            req.body.id=id

            // { id:checkemail._id }
            
            return next()
        }
        else{
            resObj = {
            status: 0,
            msg: 'please fill the correct token'
        }
        }
    }
    else {
        resObj = {
            status: 1,
            msg: 'please fill the  token'
        }
    }

    res.send(resObj)
}

module.exports = { checkToken}