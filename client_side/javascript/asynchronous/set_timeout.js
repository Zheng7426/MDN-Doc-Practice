function sayHi(who) {
    console.log(`Hello ${who}!`);
}

let myGreeting = setTimeout(sayHi, 2000, 'Mr.A');

setTimeout(() => {clearTimeout(myGreeting)}, 1000);