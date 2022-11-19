const User = require('../../models/userModel/user.model')
const Jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const { getErrorMessage } = require('../../dbErrorHandler')

exports.signIn = async (req, res) => { 
 
try {
    
    const user = await User.findOne({email: req.body.email})
    
    const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)
    
    const originalPassword = req.body.password

    if(!user || originalPassword !== decryptedPassword) res.status(401).json({message: 'user not found'});

     const accessToken = Jwt.sign({
        id: user._id,
        email: user.email
     },process.env.JWT_SEC,{expiresIn: '2d' })

     res.cookie('token',accessToken)

    res.status(201).json({
        status: 'success',
        token: accessToken,
        data: {
            user
        }
    })

} catch (error) {
    res.status(401).json({
        status: 'failed',
        error: getErrorMessage(error)
    })
}
 }

exports.signout = (req, res) => {  }

exports.verifySignin = (req,res) => { }

exports.authorisedUser = (req, res) => {  }


