const users = [
  {
    id: 1,
    name: "Asim",
    age: 28,
  },
  { id: 2, name: "Rahul", age: 25 },
  { id: 3, name: "John", age: 30 },
  { id: 4, name: "will", age: 22 },
];

const getAllUsers = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: user,
  });
};

const createUser = (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({
      success: false,
      message: "Name and age are required",
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    age,
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  });
};
const deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  users.splice(userIndex, 1);

  res.status(200).json({
    message: "User deleted successfully",
  });
};

const updateUser = (req, res) => {
    // 1. Get the ID from the request parameters and convert it to a number
    const userId = parseInt(req.params.id);

    // 2. Find the index of the user in the array
    const userIndex = users.findIndex(user => user.id === userId);

    // 3. Return a 404 if the user doesn't exist
    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    const { name, age } = req.body;

    // 4. Input Validations
    if (!name || !age) {
        return res.status(400).json({
            message: 'Name and age are required'
        });
    } else if (typeof name !== 'string') {
        return res.status(400).json({
            message: "Name must be a string"
        });
    } else if (typeof age !== 'number') {
        return res.status(400).json({
            message: 'Age must be a number'
        });
    }

    // 5. Update the user in the array
    users[userIndex] = {
        ...users[userIndex],
        name,
        age
    };

    // 6. Return the updated user with a 200 OK status
    res.status(200).json({
        success: true,
        message: 'User updated successfully',
        user: users[userIndex]
    });
};


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser
};
