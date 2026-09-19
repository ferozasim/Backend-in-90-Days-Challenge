const express = require('express');
const app = express();
const port = 3000;
const userRouter = require('./routes/userRoutes');

app.use('/users',userRouter)

app.listen(port,'localhost',()=>{
    console.log(`Server is running on port ${port}`)
})