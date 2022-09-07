const bcrypt = require("bcrypt");
const dbConnection = require('../config/database');
const salt = 10;

const signUp = async (req, res) => {
    console.log("Request body ", req.body)
    try {
        const password = req.body.password;
        const userObj = {
            name: req.body.name,
            email: req.body.email,
            password: password
        }

        const hash = await bcrypt.hash(password, salt);
        userObj.password = hash;
        console.log(":::Afer hashing userObj:::", userObj)


        let  selectQuery = 'SELECT * FROM users WHERE email ='+`'${req.body.email}'`;
    dbConnection.query(selectQuery, function (err, results) {

        console.log("Result : "+results );
        console.log("Errr "+err);
    
        if (err) {
            return res.status(400).send({ msg: err });       
        } else if(results.length > 0) {
            return res.status(400).send({message: "User already registred"})
        } else {
            let sql = "INSERT INTO users SET?";
            dbConnection.query(sql, userObj, (err, results) => {
                if (err)            
                return res.status(400).send({ msg: err });       
                console.log(results)
                res.redirect('/api/auth/users/login'); 
            });
        }
          
        })

        // 
    } catch (err) {
        console.log("Errorrrrrrrrr" + err);
    }

}

const signIn = async(req, res) => {
    // const email = req.body.email;
    // const password = req.body.password;

    try{
        const {uemail, upassword} = req.body;
    const results = await dbConnection.findOne({email : uemail})
    console.log();
    }catch{
        
    }
    
    // dbConnection.query(`SELECT * FROM users WHERE email = ${req.body.email};`, function (err, rows, results) {
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
      
    // }) 

}

module.exports = {
    signUp,
    signIn
}
