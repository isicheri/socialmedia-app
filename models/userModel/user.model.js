const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
name: {
    type: String,
    trim: true,
    require: [true,'a user must have name'],  
},
email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: [true,'a user must have an email'],
    unique: true
},
password: {
    type: String,
    required: [true,"Password is required"]
   },
   about: {
    type: String,
    trim: true
   },
   photo: {
<<<<<<< HEAD
    type: Buffer,
=======
    data: Buffer,
>>>>>>> bbfefab9b69019a52c5c404bc8aa1ee3a24646ab
    contentType: String
   }
},{timestamps: true})


const User = mongoose.model('User',userSchema)


module.exports = User