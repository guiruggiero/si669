let a = 1;
let b = 2;
let c = 3;
let i = 100;

function z(d) {
    let a = d;
    console.log(a);
}

function y(e) {
    if (e > 5) {
        let a = "big";
    } else {
        let a = "small";
    }
    console.log(a);
}

b += 2;
z(4);
console.log(a);
console.log(b);

let s = [];
for (let i = 0; i < 4; i++) {
    s.push(c * i);
    m = c + i;
}

console.log(s[3]);
console.log(i);
console.log(m);
y(6);