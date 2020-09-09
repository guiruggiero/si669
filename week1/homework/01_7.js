
let fido = {
    species: "dog",
    breed: "labradoodle",
    color: "tan",
    name: "Fido",
    speak: function() {
        return "Woof!";
    }
}

let morris = {
    species: "cat",
    breed: "tabby",
    color: "orange and black",
    name: "Morris",
    speak: function() {
        return "Meow!";
    }
}

for (a of [fido, morris]) {
    console.log(a.speak());
}

let studentRegistry = {};
let studentNames = [
    "Mary Shelley",
    "Charles Dickens",
    "Jane Austen",
    "Thomas Hardy",
    "George Eliot",
    "Lewis Carroll"
]

for (let i = 0; i < studentNames.length; i++) {
    studentRegistry[i] = studentNames[i];
}

console.log(studentRegistry);

for (let id of [1, 3, 8]) {
    delete studentRegistry[id];
}

console.log(studentRegistry);





class MenuItem {
     constructor(name, price, calories) {
         this.name = name;
         this.price = price;
         this.calories = calories;
     }

     discountPrice(discount) {
         return this.price * (1.0 - discount);
     }
 }

let menu = {
    cb: new MenuItem("Cheeseburger", 7.99, 800),
    hd: new MenuItem("Hot Dog", 4.99, 550),
    ff: new MenuItem("French Fries", 3.49, 490)
}

let order = [menu.cb, menu.ff];
let discount = 0.1;
let total = 0;

for (item of order) {
    total += item.discountPrice(discount);
}

console.log(total);