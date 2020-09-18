function f1(arg) {
    return arg + ' in river';
}

function f2(arg) {
    let ret = f1(arg);
    return ret + ' city';
}
let word = 'trouble';
let msg = f2(word);
console.log(msg);