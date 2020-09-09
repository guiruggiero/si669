// Part 1
var numTries = 0;
while (true) { 
  var r = Math.random();
  numTries++;
  if (r > 0.9) {
    console.log(r + " > 0.9. We're done after " + numTries + " tries!");
  }
  console.log("Try #" + numTries + ", " + r + " wasn't big enough, trying again!")
} 

// Part 2
var flag = false;
while (flag) {
  console.log('while');
}

do {
  console.log('do/while');
} while (flag);



// Part 3
var fruits = ["apple", "pear", "plum"];

for (var f in fruits) {
    console.log(f);
}

for (var f of fruits) {
    console.log(f);
}

for (var i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

//Part 4
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      console.log(i * j);
    }
}