console.log("1")

setTimeout(() => {
    console.log("2")
}, 0);

console.log("3")

async function getData() {
    console.log("1");

    await Promise.resolve();

    console.log("2");
}

console.log("3");

getData();

console.log("4");