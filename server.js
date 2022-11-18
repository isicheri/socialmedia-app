const app = require('./index')
const dotenv =  require('dotenv')
const mongoose = require('mongoose')

dotenv.config({ path: './config.env' })

let port = process.env.PORT || 4000

const DB = process.env.DATABASE_URI

mongoose.connect(DB,() => {
    console.log('db connected')
})


app.listen(port,() => {
    console.log('server is running')
})