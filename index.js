const express = require('express')
const cookieParser =  require('cookie-parser')
const compress =  require('compression')
const cors =  require('cors')
const helmet  =  require('helmet')
const userRoute = require('././routes/usersRoute/user.Route')
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())


app.use('/',userRoute)



module.exports = app