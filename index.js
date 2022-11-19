const express = require('express')
const cookieParser =  require('cookie-parser')
const compress =  require('compression')
const cors =  require('cors')
const helmet  =  require('helmet')
const userRoute = require('./routes/usersRoute/user.Route')
const authRoute = require('././routes/authRoute/auth.route')
const app = express()



app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

app.use(express.json())

app.use('/api/v1',userRoute)
app.use('/api/v1',authRoute)



module.exports = app