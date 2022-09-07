const bcrypt = require("bcrypt");
const dbConnection = require('../config/database');
const salt = 10;

const signUp = async (req, res) => {
    console.log("Request body ", req.body)

    const password = req.body.password;
    const userObj = {
        name: req.body.name,
        email: req.body.email,
        password: password
    }

    console.log(":::userObj:::", userObj)
    // const hash = await bcrypt.hash(password, salt, function (err, hash) {
    // Store hash in the database
    //     console.log(":::::hash:::::", hash);
    //     userObj.password = hash
    //     console.log(":::::hash:::::", userObj);
    // });

    const hash = await bcrypt.hash(password, salt);
    userObj.password = hash;
    console.log(":::Afer hashing userObj:::", userObj)

    let sql = "INSERT INTO users SET?";
    dbConnection.query(sql, userObj, (err, results) => {
        if (err) throw err;
        console.log(results)

    });
}

const signIn = (req, res) => {
    // const email = req.body.email;
    const password = req.body.password; 
    dbConnection.query(`SELECT * FROM users WHERE email = ${req.body.email};`, function(err,rows, results) {
        // if (err) {
        //     throw err;
        //     return res.status(400).send({ msg: err });
        //   }
        //   if (!results.length) {
        //     return res.status(401).send({
        //       msg: 'Email or password is incorrect!'
        //     });
        //   }
        // // if user not found
        if (rows.length <= 0) {
            console.log('Please correct enter email and Password!'); 
            res.redirect('/api/auth/users/login')
        }
        else {
            console.log('user found');
            res.redirect('/home');
        }            
    })

    // let sql =`SELECT email, password FROM user WHERE ${email} `;
    // dbConnection.query(sql, function (err, results, fields) {
        
    // })

}

module.exports = {
    signUp,
    signIn
}
