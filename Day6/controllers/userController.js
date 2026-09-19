const users = [{
    id: 1, name: "Asim", age: 28
  },
  { id: 2, name: "Rahul", age: 25 },
  { id: 3, name: "John", age: 30}
]

const getUsers = (req,res)=>{
    res.json({
        success: true,
        "message": 'Users fetched successfully',
        "data": users
    })
}

module.exports = {
    getUsers
}