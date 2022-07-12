const express = require ('express')
const mysql = require('mysql')
const bodyparser = require ('body-parser')

var app= express()
app.use(bodyparser.json())  //to read json body format

//to create connection with database
var mysqlConnection = mysql.createConnection({
    server : "127.0.0.1",
    user : "root",
    database : 'contacts'
}) 

// to verify connection with database is established or not
mysqlConnection.connect((err)=>{
  if(!err){
    console.log("Connected")
  }
  else{
    console.log("Connection failed")
  }
})
app.listen(8080,()=>console.log("server is running at port number : 8080"))

//to view the data stored in Database
app.get('/contacts',(req,res)=>{
  mysqlConnection.query('SELECT * from contact_details',(err,results)=>{
    if(!err){
      console.log(results)
      res.send(results);  
    }
    else{
      console.log("err")
    }
  })
})

//to view the data stored in Database by id
app.get('/contacts/:id',(req,res)=>{
  mysqlConnection.query('SELECT * from contact_details where id='+req.params.id,(err,results)=>{
    if(!err){
      console.log(results)
      res.send(results);  
    }
    else{
      console.log("err")
    }
  })
})


//to insert the data to a Database
app.post('/create',(req, res) => {

  let sqlQuery = "INSERT INTO contact_details values (?,?,?)" ;   //sql query to insert the data
  let data = {id:(req.params.id+1).toString(),name:req.body.name,gender:req.body.gender}

  mysqlConnection.query(sqlQuery, data,(err, results) => {
    if(!err){
      console.log("Inserted Succesfully")
      res.send(results)
    }
    else{
      console.log("err")
    }
  });
});

//to update the data in a Database
app.put('/update/:id',(req, res) => {
  let sqlQuery= "UPDATE contact_details SET name='"+ req.body.name+"', gender='"+ req.body.gender+"' WHERE id="+req.params.id;
  mysqlConnection.query(sqlQuery ,(err,results)=> {
    if(!err){
      console.log("updated Succesfully")
      res.send(results)
    }
    else{
      console.log("err")
    }
  });
});  

//to delete the data stored in Database by Id
app.delete('/delete/:id',(req,res)=>{
  mysqlConnection.query('DELETE from contact_details where Id ='+req.params.id+"",(err,results)=>{
    if(!err){
      console.log("Deleted Succesfully")
      res.send(results)
    }
    else{
      console.log("err")
    }
  })
})





