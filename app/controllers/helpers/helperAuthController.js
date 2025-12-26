const { transporter } = require("../../config/config")
const { helperModel } = require("../../models/helperModel")
let validate = require('validator')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
let userOtp = new Map()
let saltRounds = 10

let sendOtp = async (req, res) => {
    let { helperName, helperEmail, helperProfile, helperPhone, helperPassword, helpercPassword } = req.body
    let obj
    if (helperProfile == '') {
        obj = {
            status: 0,
            msg: 'please fill helper profile'
        }
        res.send(obj)
    }
    let checkEmail = await helperModel.findOne({ helperEmail: helperEmail })

    if (checkEmail) {
        obj = {
            status: 0,
            msg: 'this email already registerd'
        }
    }
    else {
        if (!validate.isEmail(helperEmail)) {
            obj = {
                status: 0,
                msg: "Invalid email format"
            }
            res.send(obj)
        }
        console.log(helperPassword)
        if (!validate.isStrongPassword(helperPassword, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, })) {
            obj = {
                status: 0,
                msg: "Password must be strong (min 8 chars, include upper, lower, number, and symbol"
            }
            res.send(obj)
        }
        if (helperPassword == helpercPassword) {
            let hash = bcrypt.hashSync(helperPassword, saltRounds)
            let insertObj = { helperName, helperEmail, helperProfile, helperPhone, helperPassword: hash}
            await helperModel.insertOne(insertObj)
                .then((resApi) => {
                    obj = {
                        status: 1,
                        msg: 'succesfully register and request send by admin'
                    }
                })
                res.send(obj)
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

let createHelperAccount = async (req, res) => {
    let { helperName, helperProfile, helperEmail, helperPhone, helperPassword, otp } = req.body
    console.log(req.body)
    let obj
    let myOtp = userOtp.get('myOTP')
    if (myOtp == otp) {
        let hash = bcrypt.hashSync(helperPassword, saltRounds)
        let insertObj = { helperName, helperEmail, helperProfile, helperPhone, helperPassword: hash, otp }
        await helperModel.insertOne(insertObj)
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

let loginAccountHelper = async (req, res) => {
    let { helperEmail, helperPassword } = req.body
    let obj
    let checkEmail = await helperModel.findOne({ helperEmail })
    if (checkEmail) {
        if (checkEmail.helperStatus == false) {
            obj = {
                status: 0,
                msg: 'do not varify contact by admin'
            }
            res.send(obj)
        }
        else {
            let getPassDb = checkEmail.helperPassword
            let checkPass = bcrypt.compareSync(helperPassword, getPassDb)

            // check token 
            let token = jwt.sign({ id: checkEmail._id }, process.env.TOKENKEY);
            if (checkPass) {

                obj = {
                    status: 1,
                    msg: 'successfull login',
                    data: checkEmail,
                    token
                }
            }
            else {
                obj = {
                    status: 0,
                    msg: 'fill correct password'
                }
            }
        }

    }
    else {
        obj = {
            status: 0,
            msg: 'please fill valid email'
        }
    }
    res.send(obj)
}


let helperViewAccount = async (req, res) => {

    let { id } = req.body
    console.log(id)
    let obj
    await helperModel.findOne({ _id: id })
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


module.exports = { sendOtp, createHelperAccount, loginAccountHelper, helperViewAccount }