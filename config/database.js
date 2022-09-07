var mysql = require('mysql');  
var con = mysql.createConnection({  
  host: "localhost",  
  port: 3306,
  user: "root",  
  password: "",
  database: "express_db" 
});  

con.connect(function(err) {  
  if (err) throw err;  
  console.log("Database Connected!");  
});  

module.exports = con
