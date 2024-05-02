const express = require("express");
const { userCreateController } = require("../controllers/userController");
const { Register } = require("../models/registerModel");

const router = express.Router();

router.post("/user", userCreateController);


router.post("/register",async(req,res)=>{
    try {
        const {name,age} = req.body;
        console.log(name,age);
        const user = new Register({name,age});
        const response = await user.save();
        res.send(response);
    } catch (error) {
        res.send(error.message);
    }
})
// Export router
module.exports = router;
