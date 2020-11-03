require('dotenv').config();
module.exports ={
    development:{
    connectionString:process.env.connectionString || "postgresql://postgres:0592280377@localhost:5432/mydb"
  },
  production:{
    connectionString:process.env.connectionString
  },
  testing:{
    connectionString:process.env.connectionString
  }
}