const { poolPromise } = require('../config/db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middleware/auth')
const jwt= require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const emailContoller = require('./emails')


exports.getUsers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM users');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.registerUser = async(req, res) => {
    try{
        const {username, email, password} = req.body;
        const pool = await poolPromise;

        //check if the required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required.' });
        }

        //check if email is already registered
        const existingUser = await pool.request()
        .input('email', email)
        .input('username', username)
        .query('SELECT * FROM users WHERE email = @email AND username = @username');
        if (existingUser.recordset.length > 0) {
            return res.status(400).json({ message: "User is already registered" });
        }


        const existingEmail = await pool.request()
        .input('email', email)
        .query('SELECT * FROM users WHERE email = @email');
        if (existingEmail.recordset.length > 0) {
            return res.status(400).json({ message: "Email already in use" });
        }
        
        const existingUsername = await pool.request()
        .input('username', username)
        .query('SELECT * FROM users WHERE username = @username');
        if (existingUsername.recordset.length > 0) {
            return res.status(400).json({ message: "Username already in use" });
        }

        //hash the password
        const password_hash = await bcrypt.hash(password, 10)

        //generate activation token
        const activationToken = generateToken(email)


        //add the user in the database
        await pool.request()
        .input('username', username)
        .input('email', email)
        .input('password_hash', password_hash)
        .input('token', activationToken)
        .query('INSERT INTO users (username, email, password_hash, activation_token) VALUES (@username, @email, @password_hash, @token)')
        res.status(201).json({ 
            message: 'User registered successfully',
            username: username,
            email: email,
            token: activationToken
        });
    }catch (error){
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

exports.activateAccount = async(req, res) => {
    try{
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        const decoded = jwt.verify( token, JWT_SECRET );
        const email = decoded.userId;
        console.log('Decoded: ', decoded)

        console.log('Email: ', email)


        const pool = await poolPromise;

        const is_active = await pool.request()
        .input('email', email)
        .query('SELECT is_active FROM users WHERE email = @email');
        if (is_active.recordset.length > 0 && is_active.recordset[0].is_active) {
            return res.status(400).json({ 
                title: "Account is already active." ,
                message: "Your account has already been activated. You can log in and start using the platform by clicking the button below.",
                action: "Go to Login"
            });
        }

        await pool.request()
            .input('email', email)
            .query('UPDATE users SET is_active = 1 WHERE email = @email');

        res.status(200).json({ 
            title: "Your Account is Now Active." ,
            message: "Thank you for verifying your email. Your account is now active, and you can proceed to the homepage by clicking the button below.",
            action: "Go to Home"
        });
    }catch(error){
        console.error('Activation Error:', error);
        res.status(400).json({ 
            title: "Account Activation Failed" ,
            message: "The activation link you used is either invalid or has expired. Please request a new activation link by clicking the button below.",
            action: "Resend Activation Link"
        });
    }
}

exports.loginUser = async(req, res) => {
    const {email, password } = req.body;

    if (!password || !email ){
        return res.status(400).json({message: "Email address and password are required"});
    }

    const pool = await poolPromise;

    const result = await pool.request()
    .input('email', email)
    .query('SELECT * FROM Users WHERE email = @email');

    const user = result.recordset[0]


    if (!user){
        return res.status(400).json({message: "Invalid email or password"})
    }

    if (user.is_active == false){
        return res.status(400).json({message: "User is not active, please check your email and activate your account first"})
    }

    const is_match = await bcrypt.compare(password, user.password_hash);

    if (!is_match){
        return res.status(400).json({message: "Invalid email or password"})
    }

    const token = generateToken(email)

    res.cookie('token', 'Bearer'+token)

    return res.status(200).json({
        message: "User logged in successfully.",
        Token: token
    })

}

exports.removeUser = async(req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const pool = await poolPromise;

    const exists = await pool.request()
        .input('email', email)
        .query('SELECT * FROM users WHERE email = @email');

    if (exists.recordset.length === 0) {
        return res.status(400).json({ message: "User does not exist" });
    }

    await pool.request()
        .input('email', email)
        .query('DELETE FROM users WHERE email = @email');

    const user = await pool.request()
        .input('email', email)
        .query('SELECT * FROM users WHERE email = @email');

    if (user.recordset.length === 0) {
        return res.status(200).json({ message: "User removed successfully" });
    } else {
        return res.status(400).json({ message: "User was not removed" });
    }

}

exports.forgotPassword = async(req, res) => {
    const { email } = req.body;
    const token = generateToken(email)
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    try {
        const pool = await poolPromise;

        const exists = await pool.request()
            .input('email', email)
            .query('SELECT * FROM users WHERE email = @email');

        if (exists.recordset.length === 0) {
            return res.status(400).json({ message: "User does not exist" });
        }   

        await pool.request()
            .input('token', token)
            .input('email', email)
            .input('expiry', expiry)
            .query('UPDATE users SET reset_token = @token, reset_token_expiry = @expiry WHERE email = @email')
    
        await emailContoller.sendResetEmail(email, token);

        res.json({ message: 'Reset email sent successfully.', token: token});

      } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error' });
      }
}

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    const date = new Date();

    try {
        const pool = await poolPromise;

        const exists = await pool.request()
            .input('token', token)
            .input('date', date)
            .query('SELECT * FROM users WHERE reset_token = @token AND reset_token_expiry > @date');

        if (exists.recordset.length === 0) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }   

        const password_hash = await bcrypt.hash(newPassword, 10)

        // const is_match = await bcrypt.compare(newPassword, password_hash);

        // if (is_match){
        //     return res.status(400).json({message: "Password change failed: the new password cannot be the same as the old password."})
        // }

        await pool.request()
            .input('password_hash', password_hash)
            .input('token', token)
            .query('UPDATE Users SET password_hash = @password_hash, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = @token')

        res.json({ message: 'Password was reset successful, please log in' });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not reset password'+err.error.message });
  }
};