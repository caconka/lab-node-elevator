const Elevator = require('./elevator.js')
const Person = require('./person.js')

let elevator = new Elevator()
let julia = new Person("Julia", 3, 7)
let juan = new Person("Juan", 2, 10)
elevator.start()
elevator.call(julia)
setTimeout(()=> elevator.call(juan), 4000)