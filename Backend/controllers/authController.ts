const usersDBTest = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
}

const bcrypttest = require('bcrypt')

const handleLogin = async (req, res)=> {
    const {user, password} = req.body;
    if (!user || !password)
        return res.status(400).json({'message': 'Username and Password are required'})
    const foundUser = usersDBTest.users.find(person => person.username === user)
    if(!foundUser) return res.sendStatus(401);
    const match = await bcrypttest.compare(password, foundUser.password)
    if (match) return res.status(200).json({'success': ` ${user} is logged in`}
    )
    else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };