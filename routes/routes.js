const express = require("express")

const router = express.Router()
const {getContact, createContact,getContactById,updateContact,deleteContact} = require("../controllers/ContactController")
const validateToken = require("../middleware/validate_token_handler")
router.use(validateToken)
router.route('/').get(getContact).post(createContact)

router.route('/:id').get(getContactById).put(updateContact).delete(deleteContact)


module.exports= router