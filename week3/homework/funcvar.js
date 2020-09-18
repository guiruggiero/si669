function f1(s){
    return s + ' ' + s;
}
let f2 = function(t) {
    return t+ '_' + t;
}
let f3 = f1;
let x1 = f1('zzz');

// console.log(fw(f3(x1)));
// console.log(f2(f1('abc')));

console.log(typeof f3)