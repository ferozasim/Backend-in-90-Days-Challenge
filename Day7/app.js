const express = require('express');
const app = express();
const port = 3000;
const getUserRoutes = require('./routes/userRoutes')

app.use(express.json())

app.use('/api/v1/users',getUserRoutes)

app.listen(port,'localhost',()=>{
    console.log(`Server is running on port ${port}`)
})