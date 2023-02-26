const nodemailer = require('nodemailer')


let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS,
    },
  });


module.exports = (emailClient, subject, url, name) => {
    let mailOption = {
        from: process.env.EMAIL_NAME,
        to: emailClient,
        subject: `${subject} is your otp`,
        text: `Hello ${name}, ${subject} is your OTP, please verify in ${url}`
    }

    transporter.sendMail(mailOption, (err, res) =>{
        if(err){
            return 'Email not sent'
        } else {
            return 'Email has been sent'
        }
    })
}