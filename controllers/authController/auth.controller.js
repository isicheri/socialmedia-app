const User = require('../../models/userModel/user.model')
const Jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')


const signIn = async (req, res) => { 
 
try {
    
    const user = await User.findOne({email: req.body.email})
    
    // const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)
    
    // const originalPassword = req.body.password

     const accessToken = Jwt.sign({
        id: user._id,
        email: user.email
     },process.env.JWT_SEC,{expiresIn: '2d' })

     res.cookie('token',accessToken)

    res.status(201).json({
        status: 'success',
            user,
           token: accessToken 
        
    })
} catch (error) {
    res.status(401).json({
        status: 'failed',
        error: 'could not signin'
    })
}
 }

const signout = (req, res) => {  
    res.clearCookie('token')
    return res.status(200).json({
    message: "signed out"
    })
 }


const verifyToken = (req,res,next) => { 
   
    const authHeader = req.headers.token

    if(authHeader) {
        const token = authHeader.split(' ')[1]

        Jwt.verify(token,process.env.JWT_SEC,(err,user) => {
            if(err) return res.status(401).json({message: 'unauthorised user'});

            req.user = user
            next()
        } )
    }else{
        res.status(403).json({
            message: 'register as a user'
        })
    }
 }

const authorisedUser = (req, res, next) => {
    verifyToken(req,res,() => {
        if(req.user.id === req.params.id) {
          next()
        }else {
            res.status(403).json({
                status: 'failed',
                message: 'authentication failed'
            })
        }
    })
}


module.exports = { authorisedUser,verifyToken,signIn,signout }
