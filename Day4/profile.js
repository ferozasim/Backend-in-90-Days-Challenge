const express = require('express');
const app = express();
const port = 8000;
app.use(express.json())


const logger = (req,res,next)=>{
    console.log('1. Logger')
    next()
}

const authMiddleware = (req,res,next)=>{
      console.log('2. auth')
    const token = req.headers.authorization

    if(!token){
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
next()
}

app.get('/profile',authMiddleware,logger,(req,res)=>{
    console.log('3. profile')
     res.json({
        message: "Welcome to profile"
    })
})



app.listen(port,'localhost',()=>{
    console.log(`Server is running on port ${port}`)
}
)