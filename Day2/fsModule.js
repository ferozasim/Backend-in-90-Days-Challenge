const fs = require('fs');

fs.writeFileSync('data.text','creating my own file by using fs module in node js');


fs.appendFileSync('data.text','\nThis is the second line of the file')
const data = fs.readFileSync('data.text','utf-8');
console.log(data);