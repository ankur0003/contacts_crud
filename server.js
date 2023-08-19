const express = require("express")
const errorHandler = require("./middleware/error_handler")
const connectDB = require("./config/dbConnection")

const dotenv = require("dotenv").config()

connectDB()
const app = express()

const port  = process.env.PORT || 5000

app.use(Cors())
//middleware
app.use(express.json())
app.use('/api/contacts',require("./routes/routes"))
app.use('/api/user',require("./routes/user_routes"))
app.use( errorHandler)

app.listen(port,()=>{
    console.log(`Listener on port ${port}`)
})


