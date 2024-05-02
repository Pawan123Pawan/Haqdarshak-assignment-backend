// middleware/sendOtp.js
const fast2sms = require("fast-two-sms");

require("dotenv").config();



exports.generateOtp = async (req, res) => { 
    const phoneNumber = req.body.phoneNumber;
    const otp = Math.floor(1000 + Math.random() * 9000);
  
    let options = {
      authorization:
        "gQp09fMD6cxhwuTJmsIMq3IRfUbXv2iQdynrIyquQPWv8V7Fo6hyk9Oi16th",
      message: `Your OTP for verification is: ${otp}`,
      numbers: [phoneNumber] // Ensure numbers is an array
    };
    if (!Array.isArray(options.numbers)) {
      return res.status(400).send("Invalid phone numbers");
    }
    try {
      const response = await fast2sms.sendMessage(options);
      console.log(response);
      res.send(`Sent OTP successfully to ${phoneNumber}`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
