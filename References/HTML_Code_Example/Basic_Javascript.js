console.log('hello world!');
window.alert('Initialized');


let x;
typeof x;
x = 1;
typeof x;
typeof 123;
typeof "hello world";
typeof 123n;
x = 1 + 2 + 3;
x;
x = 1 + '2' + 3;
x;


Number(x);
x - 0;
String(1424);
1234 + '';
Boolean(x);
Boolean(Number(x));


!!x
x = 'interesting'
x[0];
x = '     Gavin    ';
x.trim();
x.split(" ");
x.slice("0", "10");
let a = 5;
let b = 10;
console.log("Fifteen is " + (a + b) + " and\nnot " + (2 * a + b) + ".");
console.log(`Fifteen is ${a + b} and not ${2 * a + b}.`);


3 + 2;
3 - 2;
3 * 2;
3 ** 2;
3 / 2;
3 % 2;
a++;
++a;
a--;
a = 5;
a += 1;
a -= 1;
a *= 2;
a /= 2;
a %= 2;
a = 5;
a **= 2;
a == 25;
a === 25;
a == '25';
a === '25';
a !== '25';
a !== 25;
a !== 24;
!a;
1 && 1;
1 && 0;
1 || 0;
true & true;
1 & false;


let CSE = ['csci', 'ceng'];
CSE[2] = 'AIST';
CSE.length;


if (1 < 6) {
    console.log('condition1');
}
else if (2 < 6) {
    console.log('condition2');
}


a = 5;
(a > 6 ? 'yes' : "no");


switch (a = 5) {
    case 1:
        console.log('a=1');
        break;
    case 2:
        console.log('a=2');
        break;
    case 3:
        console.log('a=3');
        break;
    case 4:
        console.log('a=4');
        break;
    case 5:
        console.log('a=5');
        break;
    default:
        console.log('error!');
}


for (i = 0; i < 4; i++) {
    console.log("loop" + i);
}

for (x of CSE) {
    console.log(x + '<br>');
}

let person = { fname: "John", lname: "Doe", age: 20 };
for (x in person) {
    console.log(person[x] + '<br>');
}


i = 0;
while (i < 4) {
    console.log('loop' + i);
    i++;
}


i = 0;
do {
    console.log('loop' + i);
    i++;
}
while (i < 4);


a = 3;
b = 4;
function add(a, b) {
    return a + b;
}
add(a, b);


let z = function (a, b) { return a + b };
z(a, b);


hello = function () {
    return "Hello World!";
}
hello();


hello = () => {
    return "Hello World!";
}
hello();


hello = () => "Hello World!";
hello();


window.screen.width;
window.screen.height;
window.screen.pixelDepth;
window.location.hostname;
window.location.protocol;
window.history.back;
window.history.forward;
// window.alert("hello");
// window.confirm("click ok to open your camera.");
// x = window.prompt('please input your name. ');