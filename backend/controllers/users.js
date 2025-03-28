const { poolPromise } = require('../config/db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middleware/auth')
const jwt= require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET


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


        const existingUsername = await pool.request()
        .input('username', username)
        .query('SELECT * FROM users WHERE username = @username');
        if (existingUsername.recordset.length > 0) {
            return res.status(400).json({ message: "Username already in use" });
        }

        const existingEmail = await pool.request()
        .input('email', email)
        .query('SELECT * FROM users WHERE email = @email');
        if (existingEmail.recordset.length > 0) {
            return res.status(400).json({ message: "Email already in use" });
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