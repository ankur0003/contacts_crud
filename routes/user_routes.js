const express = require("express")
const { registerUser,loginUser, currentUser } = require("../controllers/user_controller")
const validateToken = require("../middleware/validate_token_handler")
const userRouter = express.Router()

userRouter.post('/register',registerUser)

userRouter.post('/login',loginUser)

userRouter.get('/current',validateToken ,currentUser)

module.exports = userRouter