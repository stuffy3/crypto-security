const bcrypt = require('bcrypt')
const users = []


module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existingPass = bcrypt.compareSync(password, users[i].passHash)
        if (users[i].username === username && existingPass) {
        let securedMessage = {...users[i]};
        delete securedMessage.passHash
          res.status(200).send(securedMessage)
          return
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const {username, email, firstName, lastName, password} = req.body;

        console.log('Registering User')
        
             const salt = bcrypt.genSaltSync(5);
        const passHash = bcrypt.hashSync(password, salt);

        let passObj = {
          username,
          email,
          firstName,
          lastName,
          passHash,


        }
        users.push(passObj);

        let securedMessage = {...passObj};
        delete securedMessage.passHash;
        res.status(200).send(securedMessage)
        console.log(users)
    }
   
  
  }
