const usersDBTest = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
}

const bcrypttest = require('bcrypt')

const jwt = require( 'jsonwebtoken')
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');



const handleLogin = async (req, res)=> {
    const {user, password} = req.body;
    if (!user || !password)
        return res.status(400).json({'message': 'Username and Password are required'})
    const foundUser = usersDBTest.users.find(person => person.username === user)
    if(!foundUser) return res.sendStatus(401);
    const match = await bcrypttest.compare(password, foundUser.password)
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
        const otherUsers = usersDBTest.users.filter(person => person.username !== foundUser.username)
        const currentUser = {...foundUser, refreshToken}
        usersDBTest.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '../model/users.json'), JSON.stringify(usersDBTest.users))
        const oneDay = 24*60*60*1000
        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: oneDay})
        return res.status(200).json({accessToken})
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };