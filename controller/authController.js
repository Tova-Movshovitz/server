const db = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = db.user

const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    //check the email???????????
    const duplicate = await User.findOne({ where: { email: email } })
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }

    console.log(password);

    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { name, email, password: hashedPwd }
    console.log(userObject);
    const user = await User.create(userObject)
    if (user) {
        return res.status(201).json({
            message: `New user ${user.name} created`
        })
    }
    else {
        return res.status(400).json({ message: 'Invalid user data received' })
    }
}
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        })
    }
    
    const foundUser = await User.findOne({ where: { email: email } })
    if (!foundUser) {
        
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const userInfo = {
        id: foundUser.id, email: foundUser.email,
        lname: foundUser.lname, fname: foundUser.fname
    }
    //Create the token
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    //res.setHeader('Authorization', `Bearer ${accessToken}`)
    res.json({ accessToken: accessToken })
}

module.exports = { login, register }




