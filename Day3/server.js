const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        console.log('this is home page');
        res.end("Welcome to home page");
    }else if(req.url === '/about'){
        console.log('this is about page');
        res.end("Welcome to about page");
    }else if(req.url === '/contact'){
        console.log('this is contact page');
        res.end("Welcome to contact page");
    }else {
       
        res.end("Page not found");
    }

})

server.listen(3000,"localhost",()=>{
    console.log('server is running on port 3000');
});