const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer");
const frontendURL = process.env.FRONTEND_URL
const { poolPromise } = require('../config/db');
const { generateToken } = require('../middleware/auth')


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: "ashinabarasa91@gmail.com", 
      pass: "voww vwwt xtnu clrz",   
  },
});

exports.sendRegistrationEmail = async (req, res, next) => {
  console.log(req.body)
  try {
    const { recipient, token } = req.body;

    console.log("Request Body:",recipient, token)

    if (!recipient || !token) {
      return res.status(400).json({ error: "Email and activation token are required" });
    }

    const pool = await poolPromise

    const is_active = await pool.request()
    .input('email', recipient)
    .query('SELECT * FROM users WHERE email = @email AND is_active = 1');
    if (is_active.recordset.length > 0){
      return res.json({ message: "Account is already Active" })
    }  

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: testAccount.user,
    //     pass: testAccount.pass,
    //   },
    // });

    const templatePath = path.join(__dirname, '../Email Templates/registrationEmail.html')
    let emailTemplate = fs.readFileSync(templatePath, 'utf-8')
    const activationLink = `${frontendURL}/activate-account?token=${token}`;
    emailTemplate = emailTemplate.replace('{{activationLink}}', activationLink)

    const mailOptions = {
      from: '"QAstra" <ashinabarasa@gmail.com>',
      to: recipient,
      subject: "Welcome to QAstra",
      html: emailTemplate,
    };

    const info = await transporter.sendMail(mailOptions);

    res.json({
      messageId: info.messageId,
      message: "Activation email sent successfully",
    });
  } catch (error) {
    console.error('Error sending activation email:', error);
    res.status(500).json({ 
      message: 'Internal Server Error',
      error: error
     });
    next(error);
  }
};

exports.resendActivationEmail = async (req, res, next) => {
  try{
    const { recipient } = req.body;

    if (!recipient) {
      return res.status(400).json({ message: "Email is required" });
    }

    const new_token = generateToken(recipient);

    const pool = await poolPromise;
    const exists = await pool.request()
      .input('email', recipient)
      .query('SELECT * FROM users WHERE email = @email');
    if (exists.recordset.length == 0){
      return res.status(400).json({ message: "Account does not exist, please register." })
    }

    const is_active = await pool.request()
      .input('email', recipient)
      .query('SELECT * FROM users WHERE email = @email AND is_active = 1');
    if (is_active.recordset.length > 0){
      return res.status(400).json({ message: "Account is already Active" })
    }

    await pool.request()
    .input('email', recipient)
    .input('new_token', new_token)
    .query('UPDATE Users SET activation_token=@new_token where email=@email')

    const templatePath = path.join(__dirname, '../Email Templates/resendActivationEmail.html')
    let emailTemplate = fs.readFileSync(templatePath, 'utf-8')
    const activationLink = `${frontendURL}/activate-account?token=${new_token}`;
    emailTemplate = emailTemplate.replace('{{activationLink}}', activationLink)

    const mailOptions = {
      from: '"QAstra" <ashinabarasa91@gmail.com>',
      to: recipient,
      subject: "Resend Activation Email",
      html: emailTemplate,
    };

    const info = await transporter.sendMail(mailOptions);

    

    res.status(200).json({
      messageId: info.messageId,
      message: "The token has been updated, and the activation email has been sent successfully.",
    });

    


  }catch(error){
    console.error('Error sending activation email:', error);
    res.status(500).json({ 
      message: 'Internal Server Error',
      error: error
     });
    next(error);
  }

}


// felixkpt@gmail.com

