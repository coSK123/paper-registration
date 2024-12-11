const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
}
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res)=> {
    const {user, password} = req.body;
    if (!user || !password)
        return res.status(400).json({'message': 'Username and Password are required'})
    //TODO check for duplicate username before entering a new user
    const duplicate = usersDB.users.find(person => person.username === user)
    if (duplicate) return res.sendStatus(409)
        try{
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {'username': user, "password": hashedPassword}
            usersDB.setUsers([...usersDB.users, newUser])
            await fs.promises.writeFile(
                path.join(__dirname, '..', 'model', 'users.json'),
                JSON.stringify(usersDB.users)
            )
            console.log(usersDB.users);
            res.status(201).json({'sucess': `New user ${user} created!`})
        }
        catch(err){
            res.status(500).json({'message': err.message})

        }
}

module.exports = { handleNewUser };


