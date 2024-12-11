const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
}

const bcrypt = require('bcrypt')

const jwt = require( 'jsonwebtoken')
require('dotenv').config();
const fs = require('fs');
const path = require('path');



const handleLogin = async (req, res)=> {
    const {user, password} = req.body;
    if (!user || !password)
        return res.status(400).json({'message': 'Username and Password are required'})
    const foundUser = usersDB.users.find(person => person.username === user)
    if(!foundUser) return res.sendStatus(401);
    const match = await bcrypt.compare(password, foundUser.password)
    if (match) {
        const accessToken = jwt.sign(
            { "username": foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username)
        const currentUser = {...foundUser, refreshToken}
        usersDB.setUsers([...otherUsers, currentUser]);
        await fs.promises.writeFile(
            path.join(__dirname, '../model/users.json'), JSON.stringify(usersDB.users))
        const oneDay = 24*60*60*1000
        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: oneDay})
        return res.status(200).json({accessToken})
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };