const asyncHandler = require("express-async-handler")


const Contact = require("../models/contact_model")

//@access private
const getContact = asyncHandler(async (req, res) => {
        const contacts = await Contact.find({user_id:req.user.id})
        res.status(200).json(contacts)   
    
}
)

//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log("Request Body is: ", req.body)
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("Parameters are required")
    }
    const contacts = await Contact.create({
        name, email, phone,user_id:req.user.id
    })
    res.status(201).json(contacts)
})

//@access private
const getContactById = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id)
    if (!contacts) {
        res.status(404)
        throw new Error("No Contact Found")
    }
    res.status(200).json(contacts)
})

//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id)
    if (!contacts) {
        res.status(404)
        throw new Error("No Contact Found")
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if(contacts.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error("Permission Denied")
    }
    res.status(200).json(updatedContact)
})

//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id)
    if (!contacts) {
        res.status(404)
        throw new Error("No Contact Found")
    }
    const reult  = await Contact.findByIdAndRemove(req.params.id)
    
    if(contacts.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error("Permission Denied")
    }
    res.status(200).json(reult)
})
module.exports = { getContact, createContact, getContactById, updateContact, deleteContact }