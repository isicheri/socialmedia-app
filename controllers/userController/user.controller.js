const mongoose = require('mongoose')
const CryptoJS = require('crypto-js')
const {getErrorMessage} = require('../../dbErrorHandler')
const User = require('../../models/userModel/user.model')



exports.createUser = async(req,res) => {
    try {
        const user = await User.create(req.body)
       
        if(req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
    }

      return res.status(201).json({
        status: 'success',
        data: {
            user  
        },
        message: 'user successfully registered'
      })

    } catch (error) {
        return res.status(400).json({
            error: getErrorMessage(error)
        })
    }
}


exports.getAllUsers = async (req,res) => {
try {
    const user = await User.find()

    return res.status(200).json({
        status: 'success',
        data: {
            user
        },
        message: 'this are all the users'
    }) 
} catch (error) {
    res.status(400).json({
        status: 'failed',
        error: getErrorMessage(error)
    })
}

}

exports.userById = async (req,res,next,id) => {

    try {
        let user = await User.findById(id)
        if (!user)
        return res.status(400).json({
        error: "User not found"
        })
        req.profile = user
        next()
        } catch (error) {
        return res.status('400').json({
        error: getErrorMessage(error)
        })
        }
}

exports.getUserById = (req,res) =>{   
        req.profile.password = undefined
        
        return res.json(req.profile)   
}
        
exports.updateUserById = async(req,res) => {
    try {
      
        let user =  await User.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        })

      user.password = undefined
    
        req.profile = user  

       res.status(200).json(user)

    } catch (error) {
        res.status(400).json({
            error: getErrorMessage(error)
        })
    }
}


exports.deleteUserById = async (req,res) => {
   try {
    let user = await User.findByIdAndDelete(req.params.id)

    req.profile = user

    res.status(200).json({
        message: 'user deleted'
    })
   } catch (error) {
    res.status(400).json({
        message: 'failed',
        error: getErrorMessage(error)
    })
   }
}

