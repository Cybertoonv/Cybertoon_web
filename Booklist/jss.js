//logs
// document.write("This is a js code")
// console.error("This is an error")
// console.warn("This is an warning")
// console.log("this is a log ")

//
let name="aeiyan";
let age =20;
const s =`${name} is ${age} years old`
console.log(s.split(" "))

// json convert
const todo =[
    {
        id:1,
        text:"Hello world",
        isCompleted:true
    },
    {
        id:2,
        text:"Welcome to reality",
        isCompleted:false
    },
    {
        id:3,
        text:"Something seem a bit different",
        isCompleted:true
    }
    
]

const todojson =JSON.stringify(todo)
console.log(todojson)

// for(let todos of todo){
//     console.log(`task ${todos.id} i.e ${todos.text} is it completed ? ${todos.isCompleted}.`)
// }
// for (let t=0;t<todo.length;t++){
//     console.log(todo[t].text)
// }
// let i=0;
// while(i<10){
//     ++i;
//     console.log(i)
// }


/// filter, foreach, map
todo.forEach(function(todos) {
    console.log(todos)
  
})
//map
const todoText = todo.map(function(todos){
    return todos.text;
})
console.log(todoText)
//filter
const todofilter = todo.filter(function(todos){
    return todos.isCompleted== true; 
})
console.log(todofilter)

///filter and map
const todoflter = todo.filter(function(todos){
    return todos.isCompleted== true; 
}).map(function(todos){
    return todos.text
})
console.log(todoflter)

///switches
const x =11;
const color = x>9 ? "blue" : "red"
console.log(color)
switch(color){
    case "red":
        console.log(`color is ${color}`);
        break;
    case "blue":
        console.log(`color is ${color}`);
        break;
    default :
        console.log(`color is neither red nor green`)
        break;  
}


/// functions 
function Add(num1,num2){
    return num1+num2;
}

console.log(Add(1,2))

//according to es5'
const subtract=(num1=1,num2=2 )=> console.log(num1-num2)
subtract(4,6)
subtract()

//Constructor functions
function Person(firstname,lastname,dob){
    this.firstname=firstname;
    this.lastname=lastname;
    this.dob=dob;
    this.fullname= function(){
        return `${this.firstname} ${this.lastname}`
    }
    }
//instantiate function

const person1=new Person("Mohammad","Aeiyan","02/25/2004");
const person2 =new Person("Paul","kenneth",'2/2/2004');
///using s
console.log(person1.fullname())

console.log("classes")
// classes

class Human{
    constructor(firstname,lastname,dob){
        this.firstname=firstname;
        this.lastname=lastname;
        this.dob=dob;
    }
    Fullname(){
        return `${this.firstname} ${this.lastname}`
    }
}


const p1=new Human("Mohammad","Aeiyan","02/25/2004");
const p2 =new Human("Paul","kenneth",'2/2/2004');
///using s
console.log(p1.Fullname());





