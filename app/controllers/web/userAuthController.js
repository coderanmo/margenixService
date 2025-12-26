
let validate = require('validator')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
let userOtp = new Map()
let saltRounds = 10
const { userAuthModel } = require('../../models/userAuthModel');

let sendOtp = async (req, res) => {
    let { userName, userEmail, userPhone, userPassword, usercPassword } = req.body

    let obj
    let checkEmail = await userAuthModel.findOne({ userEmail: userEmail })

    if (checkEmail) {
        obj = {
            status: 0,
            msg: 'this email already registerd'
        }
    }
    else {
        if (!validate.isEmail(userEmail)) {
            obj = {
                status: 0,
                msg: "Invalid email format"
            }
            res.send(obj)
        }
        console.log(userPassword)
        if (!validate.isStrongPassword(userPassword, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, })) {
            obj = {
                status: 0,
                msg: "Password must be strong (min 8 chars, include upper, lower, number, and symbol"
            }
            res.send(obj)
        }
        if (userPassword == usercPassword) {
            let hash = bcrypt.hashSync(userPassword, saltRounds)
            let insertObj = { userName, userEmail, userPhone, userPassword: hash}
            await userAuthModel.insertOne(insertObj)
                .then((resApi) => {
                    obj = {
                        status: 1,
                        msg: 'succesfully register'
                    }
                })

        }
        else {
            obj = {
                status: 0,
                msg: 'password and confirm Password are not same'
            }
        }
    }
    res.send(obj)
}

let createUser = async (req, res) => {
    let { userName, userEmail, userPhone, userPassword, otp } = req.body
    console.log(req.body)
    let obj
    let myOtp = userOtp.get('myOTP')
    if (myOtp == otp) {
        let hash = bcrypt.hashSync(userPassword, saltRounds)
        let insertObj = { userName, userEmail, userPhone, userPassword: hash, otp }
        await userAuthModel.insertOne(insertObj)
            .then((resApi) => {
                obj = {
                    status: 1,
                    msg: 'succesfully register'
                }
            })
    }
    else {
        obj = {
            status: 0,
            msg: 'please fill correct otp'
        }
    }
    res.send(obj)

}

let loginUser = async (req, res) => {
    let { userEmail, userPassword } = req.body
    console.log(userEmail)
    let obj
    let checkEmail = await userAuthModel.findOne({ userEmail })

    if (checkEmail) {
        let encryptPass = checkEmail.userPassword
        console.log(encryptPass)
        let checkPass = bcrypt.compareSync(userPassword, encryptPass)

        // create token 
        let token = jwt.sign({ id: checkEmail._id }, process.env.TOKENKEYUSERS);


        if (checkPass) {
            obj = {
                status: 1,
                msg: 'succesfull login',
                data: checkEmail,
                token
            }
        }
        else {
            obj = {
                status: 0,
                msg: 'Invalid password'
            }
        }
        res.send(obj)
    }
    else {
        obj = {
            status: 0,
            msg: 'Email inavalid'
        }
        res.send(obj)
    }
}

let viewUser = async (req, res) => {
    let obj
    await userAuthModel.find()
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data view',
                data: resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no data view'
            }
            res.send(obj)
        })
}

let changePassword = async (req, res) => {
    let { id, userPassword, newPassword, rePassword } = req.body
    let obj

    let checkEmail = await userAuthModel.find({ _id: id })
    console.log(checkEmail)
    let dbPass = checkEmail[0].userPassword
    console.log(dbPass)
    let checkOldPass = bcrypt.compareSync(userPassword, dbPass)
    if (checkOldPass) {
        if (newPassword == rePassword) {
            let hash = bcrypt.hashSync(newPassword, saltRounds)

            await userAuthModel.updateOne({ _id: id }, {
                $set: {
                    userPassword: hash
                }
            })
                .then((resApi) => {
                    obj = {
                        status: 1,
                        msg: 'succesfully change password'
                    }
                })
        }
        else {
            obj = {
                status: 0,
                msg: 'new password & confirm password are not same'
            }
        }
    }
    else {
        obj = {
            status: 0,
            msg: 'please fill correct old password'
        }
    }
    res.send(obj)
}

let userChangeProfile = async (req, res) => {
    let { id } = req.body
    let { userGender, userName, userPhone, userAddress } = req.body
    console.log(userGender)
    await userAuthModel.updateOne({ _id: id }, {
        $set: {
            userGender: userGender,
            userName: userName,
            userPhone: userPhone,
            userAddress: userAddress
        }
    })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'update profile'
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'fill userName or userPhone'
            }
        })
    res.send(obj)
}

let viewProfileUser = async (req, res) => {
    let { id } = req.body

    let obj
    await userAuthModel.findOne({ _id: id })
        .then((resApi) => {
            obj = {
                status: 1,
                data: resApi
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no data'
            }
        })
    res.send(obj)
}


module.exports = { sendOtp, createUser, loginUser, viewUser, changePassword, userChangeProfile, viewProfileUser }