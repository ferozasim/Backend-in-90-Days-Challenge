const express = require('express');
const app = express();
const port = 3000;
app.use(express.json())


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

// Middleware to log the request method and URL
app.use((req,res, next)=>{
    console.log(req.method, req.url)
    // next()
})
//
app.post('/users',(req,res)=>{

    const { name, age } = req.body

    if(!name || age === undefined){
        return res.status(400).json({
            message: 'Name and age are required'
        })
    }else if(typeof name !== 'string'){
        return res.status(400).json({
            message: "Name must be a string"
        })
    }else if(typeof age !== 'number'){
        return res.status(400).json({
            message: 'Age must be a number'
        })
    }
    res.status(201).json({
        message: 'User created successfully',
        user: {
            name,
            age
        }
    })
})


const users = [
  { id: 1, name: "Asim", age: 28 },
  { id: 2, name: "Rahul", age: 25 }
]
// Update user by ID
app.put('/users/:id', (req, res) => {
    const { id } = req.params

    const user = users.findIndex(
        user => user.id === parseInt(id)
    )

    console.log(req.body)

    if (user === -1) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    users[user] = {
        ...users[user],
        ...req.body
    }

    res.status(200).json({
        message: 'User updated successfully',
        user: users[user]
    })
})
// Delete user by ID
app.delete('/users/:id', (req, res) => {
     const { id } = req.params

        const user = users.findIndex(
            user => user.id === parseInt(id)    
    )

    if (user === -1) {
        return res.status(404).json({
            message: 'User not found'
        })
    } 
    users.splice(user, 1)
    res.status(200).json({
        message: 'User deleted successfully'
    })
})
// Get all users
app.get('/users', (req, res) => {
    
    res.status(200).json({
        message: 'Users fetched successfully',
        users
    })
 })


app.listen(port,'localhost',()=>{
    console.log(`Server is running on http://localhost:${port}`);
})