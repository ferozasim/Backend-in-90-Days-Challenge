const express = require('express');
const app = express();
const port = 3000;

const logger = (req,res,next)=>{
    console.log('1. Logger', req.method, req.url)
    next()
}

app.use(express.json())
app.use(logger)
const authMiddleware = (req,res,next)=>{
    console.log('2. auth', req.method, req.url)
    const token = req.headers.authorization
    if(!token){
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    next()
}

const users = [{
    id: 1, name: "Asim", age: 28
  },
  { id: 2, name: "Rahul", age: 25 },
  { id: 3, name: "John", age: 30}
]

app.get('/error',(req,res,next)=>{
   const error =  new Error('Something went wrong')
next(error)
})



app.get('/users',(req,res)=>{
    res.status(200).json({
        message: 'Users fetched successfully',
        users
    })
})


app.get('/users/:id',authMiddleware,(req,res)=>{
    const { id } = req.params
    const user = users.find(user => user.id === parseInt(id))
    if(!user){
        return res.status(404).json({
            "success": false,
            "message": 'User not found'
        })
    }

    res.status(200).json({
        "success": true,
        "message": 'User fetched successfully',
        "data": user
    })
}

)
app.post('/users',authMiddleware,(req,res)=>{
    const { name, age } = req.body

    if(!name || !age){
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

    const newUser = {
        id: users.length + 1,
        name,
        age
    }

    users.push(newUser)

    res.status(201).json({
        message: 'User created successfully',
        user: newUser
    })
})

app.put('/users/:id',authMiddleware,(req,res)=>{
    const { id } = req.params
    const { name, age } = req.body
    const userIndex = users.findIndex(user => user.id === parseInt(id))

    if(userIndex === -1){
        return res.status(404).json({
            message: 'User not found'
        })
    }

    if(name && typeof name !== 'string'){
        return res.status(400).json({
            message: 'Name must be a string'
        })
    }else if(age && typeof age !== 'number'){
        return res.status(400).json({
            message: 'Age must be a number'
        })
    }else{
        users[userIndex] = {
            ...users[userIndex],
            name: name || users[userIndex].name,
            age: age || users[userIndex].age
        }
    }

    res.status(200).json({
        message: 'User updated successfully',
        user: users[userIndex]
    })
})


app.delete('/users/:id',authMiddleware,(req,res)=>{
    const { id } = req.params
    const userIndex = users.findIndex(user => user.id === parseInt(id))

    if(userIndex === -1){
        return res.status(404).json({
            message: 'User not found'
        })
    }

    users.splice(userIndex, 1)

    res.status(200).json({
        message: 'User deleted successfully'
    })
}

)
app.use((err,req,res,next)=>{
    console.error("message:",err.message)
    console.error("stack:",err.stack)
    res.status(500).json({
        message: 'Internal Server Error'
    })
})

app.listen(port,'localhost',()=>{
    console.log(`Server is running on port ${port}`)
})