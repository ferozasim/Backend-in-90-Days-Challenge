const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    res.send('Hello from Express')
})

app.get('/me/:id',(req,res)=>{
res.send(`Hello from Express ${req.params.id}`)
console.log(req.params.id)
})

app.get('/users/:userId',(req,res)=>{
    console.log(req.params.userId)
    res.send(`Hello from Express /users/${req.params.userId}?role=${req.query.role}`)
    
})


app.use(express.json())

app.post('/user',(req,res)=>{
 
  const { name, age } = req.body
   res.status(201).json({
    message: 'User created successfully',
    user: {
        name,
        age
    }
   })
})

app.post('/nashra',(req,res)=>{
const {name,age,class:className } = req.body

res.status(201).json({
    message: 'User created successfully',
    user: {
        name,
        age,
        class: className
    }
})
})

app.listen(port,'localhost',()=>{
    console.log(`Server is running on http://localhost:${port}`);
})