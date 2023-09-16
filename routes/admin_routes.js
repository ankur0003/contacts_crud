const express = require("express")
const asyncHandler = require("express-async-handler")

const router = express.Router()
const User = require("../models/user_model")
const Contact = require("../models/contact_model")
const { default: mongoose } = require("mongoose")

const getData = asyncHandler(
    async (req, res) => {

        let arr = []
        try {
            const user = await User.find()

            // var _contact = await _getContacts( user[2])
            // console.log(`mc jaskc jks ${_contact}`)
            // arr.push(_contact)

            for(let element of user){

                let _contact = await _getContacts(element)
                arr.push({...JSON.parse(JSON.stringify(element)),contacts:_contact})
            }
        


            if (user) {
                res.status(200).json({data: arr })
            } else {
                res.status(404)
                throw new Error("Users Not Found")
            }
        } catch (error) {
            console.log(error)
        }
    }

)
const _getContacts =async (user) => {
    var contacts = await Contact.find({ user_id: user.id })

    return contacts
    // if(contacts){
    //     console.log(`Returning JSON Data ${contacts}`)
    //     //  json({contacts})
    // }else{
    //     throw new Error("Not Found")
    // }
}
router.route('/').get(getData)

module.exports = router