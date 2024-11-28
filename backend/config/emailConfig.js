
const nodemailer = require('nodemailer');
require('dotenv').config(); 


const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io', 
  port: 587, 
  auth: {
    user: process.env.MAILTRAP_USER, 
    pass: process.env.MAILTRAP_PASS,
  },
});

module.exports = transporter;
