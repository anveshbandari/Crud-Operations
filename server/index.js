const express = require('express')
const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const bodyparser = require('body-parser')
const jwt = require("jsonwebtoken")
const cors = require('cors')

// Creating an Express app.
const app = express();
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

// Connection to the MySQL database, using the createConnection() method.
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'A262626a@',
    database: 'crudoperations'
  });
  
connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the MySQL database');
});


// Register Api
app.post('/register',async(req,res)=>{
    const {email,password}=req.body;  
    const saltrounds = 10
    const hashedPasswd = await bcrypt.hash(password,saltrounds)  
    console.log(hashedPasswd)

    // performing queries using the query() method of the connection object.
    connection.query( 'SELECT * FROM users WHERE email = ?',[email],(err,result)=>{
        if(err){
            return res.status(500).json({err})
        }else if(result.length>0){
            return res.status(400).json({message:"Email Already exists. please choose another email"})
        }else{
            // Inserting the user's information into the database.
            connection.query(`INSERT into users (email,password) VALUES (?,?)`,
            [email,hashedPasswd],
            (err,result)=>{
                if(err){
                    return res.status(500).json({err})
                }
                return res.status(200).json({message:'User created successfully',data:result})
            })
        }
    })
})


// Login Api
app.post('/login',(req,res)=>{
    const {email,password}=req.body; 
    if(!email || !password){
      return res.status(400).json({message: "Enter valid email and password"})
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({message: "Enter valid email"})
    }
    connection.query(`SELECT * from users WHERE email= ?`,[email],(err,data)=>{
      if(err){
        return res.status(500).json({err})
      }
      if(data.length>0){
        const hashedPasswd = data[0].password;
        bcrypt.compare(password,hashedPasswd,(err,result)=>{
          if(err){
            return res.status(500).json({err})
          }
          else if(result){
            return res.status(200).json({message:"Logged in successfully"})
          }else{
            return res.status(400).json({message:"Enter Correct password"})
          }
        })
      }else{
        return res.status(404).json({message:"Enter Correct Email"})
      }
    })
  })
  

// student register

app.post('/student/register',async(req,res)=>{
    const {name,contact,email,address}=req.body;

   // check unique phone number
    connection.query(`SELECT * FROM managementsystem where contact = ?`,[contact],(err,data)=>{
        if(err){
            return res.status(500).json({message:"Internal server error in db query"})
        }
        else if (data.length>0){
            return res.status(400).json({message:"Mobile already exists"})
        }else{
        // check unique email 
            connection.query(`SELECT * FROM managementsystem where email = ?`,[email],(err,data)=>{
                if(err){
                    return res.status(500).json({message:"Internal server error in db query"})
                }
                else if (data.length>0){
                    return res.status(400).json({message:"Email already exists"})
                }else{
                    //create user
                    connection.query(`INSERT INTO managementsystem (name,contact, email,address) VALUES (?,?,?,?);`,
                    [name,contact,email,address],
                    (err,data)=>{
                        if(err){
                            return res.status(500).json(err)
                        }
                        return res.status(200).json(data)
                    })
                }
            })
        }
    })
})

// Get all students
app.get('/students',(req,res)=>{
    connection.query(`SELECT * FROM managementsystem`,(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
})

// Get student by id
app.get('/students/:id',(req,res)=>{
    const {id} =req.params
    connection.query(`SELECT * FROM managementsystem WHERE id = ?`,[id],(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
})

//update Record
app.patch('/students/:id',(req,res)=>{
    const {id} =req.params;
    const {name,contact, email,address}=req.body;
    connection.query(`UPDATE managementsystem SET name=?,contact=?,email=?,address=? WHERE id = ?`,
    [name,contact,email,address,id],
    (err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
    
})

//delete record
app.delete('/students/:id',(req,res)=>{
    const {id} =req.params
    connection.query(`DELETE FROM managementsystem WHERE id = ?`,[id],(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
})
app.listen(4000,()=>{
    console.log('server running on localhost 4000')
})