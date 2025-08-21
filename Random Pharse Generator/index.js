let obj1 = {
    1: "Crazy",
    2: "Amazing",
    3: "Fire"
};

let obj2 = {
    1: "Engine",
    2: "Foods",
    3: "Grammets"
};

let obj3 = {
    1: "Bros",
    2: "Limited",
    3: "Hub"
};

// Generate random numbers between 1 and 3
let ran1 = Math.floor(Math.random() * 3) + 1;
let ran2 = Math.floor(Math.random() * 3) + 1;
let ran3 = Math.floor(Math.random() * 3) + 1;

// Correctly concatenate strings
console.log(obj1[ran1] + " " + obj2[ran2] + " " + obj3[ran3]);
