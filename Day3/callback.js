function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}

function afterGreeting() {
    console.log("Greeting completed");
}

greet("Asim", afterGreeting);