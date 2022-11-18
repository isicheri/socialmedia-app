const mongoose = require('mongoose')
const CryptoJS = require('crypto-js')
const {getErrorMessage} = require('../../dbErrorHandler')
const User = require('../../models/userModel/user.model')


exports.createUser = async(req,res) => {
    try {
        const user = await User.create(req.body)
       
        if(req.body.password) {
            req.body.password = await CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
    }

      return res.status(200).json({
        status: 'success',
        data: {
            user  // based on this project br showing you guys the user info cause it just a personal project
        },
        message: 'user successfully registered'
      })

    } catch (error) {
        return res.status(400).json({
            error: getErrorMessage(error)
        })
    }
}
