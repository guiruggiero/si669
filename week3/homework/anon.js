let fruit = ['grape', 'plum', 'apricot'];
let veg = ['pea', 'asparagus', 'carrot'];
let cheese = ['cheddar', 'brie', 'colby'];

function mid(s) {
	return s[0];
}
console.log(fruit.map(mid));

let f = fruit.map(x => x.length);
console.log(f);

veg.sort(function(x, y) {
    x_last = x[x.length - 1];
    y_last = y[y.length - 1];
    if (x_last > y_last) {
        return -1;
    } else if (x_last < y_last) {
        return 1;
    } else {
        return 0;
    }
});
console.log(veg);

let c = cheese.map(mid);
c.sort((a, b) => {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
});
console.log(c);


