class Person {
    constructor(nm) {
        this.name = nm;
    }
    
    greet() {
        //console.log("Hi, I'm " + this.name + "!");
        console.log("In greet(), this is ", this);
    }
}

// let joe = new Person("Joe");
// joe.greet();

// setTimeout(joe.greet, 500);


class Person2 {
    constructor(nm) {
        this.name = nm;
    }

    greet = () => {
        console.log("Hi, I'm " + this.name + "!");
        //console.log("In greet(), this is ", this);
    }
}

let jen = new Person2("Jen");
jen.greet();

setTimeout(jen.greet, 500);