const path = require('path');


// console.log(path.basename(__filename));
// console.log(path.dirname(__filename));
// console.log(path.extname(__filename));

const filePath = path.join(__dirname, 'data', 'users.json');
console.log(filePath);