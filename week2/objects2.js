class Student {
    constructor(fname, lname, id) {
      this.firstName = fname;
      this.lastName = lname;
      this.id = id;
    }
    fullName() {
      return this.firstName + ' ' + this.lastName;
    }
}

var classRoster2 = {
    1123: new Student("Jane", "Doe", 1123),
    3467: new Student("Liz", "Lemon", 3467),
    7801: new Student("Peter", "Parker", 7801),
  }

// for (k in classRoster2) {
//     console.log(classRoster2[k].fullName());
// }

console.log(classRoster2['3467'].lastName);