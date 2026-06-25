 const express = require('express');
 const cors = require('cors');
const app = express();


// app.use(cors())
// app.use(express.json())
 

//  app.use((req,res,next)=>{
//      console.log("Hello World1")
// next()
// })

//  app.use((req,res,next)=>{
//      console.log("Hello World2")
// next()
// })
//  app.use((req,res,next)=>{
//      console.log("Hello World3")
// next()
// })
 app.get("/",(req,res)=>{   
     console.log("Hello World4")
    res.send("Hello World")
 })
app.listen(5000, () => {
    console.log("Server Started practice on port 5000");
});


//////////////////////////////////////////////
app.get('/users/:id',(req,res)=>{
    const userId = req.params.id;
     console.log(req.params,'dd')
     console.log("User ID:", userId);

})
app.get('/users',(req,res)=>{
    const querylist = req.query;
     console.log(querylist,'all')
     console.log(req.query.page,'page')
     console.log(req.query.limit)

})
app.post('/users',(req,res)=>{
    const querylist = req.query;
     console.log(req.querylist)
     console.log(req.query.page)
     console.log(req.query.limit)

})