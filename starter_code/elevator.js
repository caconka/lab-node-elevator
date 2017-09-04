class Elevator {
  constructor(){
    this.floor       = 0
    this.MAXFLOOR    = 10
    this.direction   = "up"
    this.requests    = []
    this.waitingList = []
    this.passengers  = []
  }

  start() {
    this.interval = setInterval(() => this.update(), 1000)
  }

  stop() { 
    clearInterval(this.interval)
  }

  update() { 
    if(this.requests.length == 0) {
      this.stop()
    } else if(this.floor < this.requests[0]) {
      this.direction = "up"
      this._passengersLeave(); this._passengersEnter(); this.floorUp()
    } else if(this.floor > this.requests[0]) {
      this.direction = "down"
      this._passengersLeave(); this._passengersEnter(); this.floorDown();
    } else {
      this._passengersLeave(); this._passengersEnter()
    }
    this.log()
  }

  _passengersEnter() { 
    for(let i=0; i<this.waitingList.length; i++) {
      if(this.waitingList[i].originFloor == this.floor) {
        this.passengers.push(this.waitingList[i])
        this.requests.push(this.waitingList[i].destinationFloor)
        console.log(`${this.waitingList[i].name} has enter the elevator`)
        this.waitingList.splice(i,1)
        this.requests.splice(i,1)
      } 
    }
  }

  _passengersLeave() { 
    for(let i=0; i<this.passengers.length; i++) {
      if(this.passengers[i].destinationFloor == this.floor) {
        console.log(`${this.passengers[i].name} has left the elevator`)
        this.passengers.splice(i,1)
        this.requests.splice(i,1)
      }
    }
  }

  floorUp() { 
    this.floor != this.MAXFLOOR ? this.floor ++ : console.log("Top floor")
  }

  floorDown() { 
    this.floor != 0 ? this.floor -- : console.log("Ground floor")
  }

  call(person) { 
    this.requests.push(person.originFloor)
    this.waitingList.push(person)
  }

  log() { 
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`)
  }
}

module.exports = Elevator;
