
const express = require("express");
const router = express.Router();
const UserDetails = require("../Models/user_schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signUp", async(req, res) => {
    const { userEmail, password } = req.body
    
    try {

        const data = await UserDetails.findOne({ userEmail: userEmail })
        if (data) {
            res.send({ message: "user already Exist!" })
        }
        else {
            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    return res.json({ message: err.message })
                }
                else{
                    const data = await UserDetails.create({
                        userEmail,
                        password: hash
                    })
                    res.json({message: "Congratulations signUp sucessfull!",data});
                    console.log(data);
                }
            })
        }
    }

    catch (e) {
        res.send({
            message: e.message
        })
    }
})

router.post("/login",async (req, res) => {
    const { userEmail, password } = req.body
    try {

        const isuser = await UserDetails.findOne({ userEmail: userEmail });
        if (isuser) {
            const ispassword =  bcrypt.compare(password, isuser.password);
            if (ispassword) {
                token = jwt.sign({ id:isuser.id}, "secret")
                res.json({ message:"success", token:token })
                
            }
            else{
                res.json({message:"Invalid"})
            }
        }
        else {
            res.json({ message: "Unregistered" })
        }
    }
    catch (e) {
        res.send({
            message: e.message
        })
    }
});

module.exports = router;