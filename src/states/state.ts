import Player from "./Player.js"
// import InputHandler from "./input.js"

export const enum states {
    STANDING_LEFT,
    STANDING_RIGHT,
    SITTING_LEFT,
    SITTING_RIGHT,
    RUNNING_LEFT,
    RUNNING_RIGHT,
    JUMPING_LEFT,
    JUMPING_RIGHT,
    FALLING_LEFT,
    FALLING_RIGHT
}



class State {
    public state
    protected player !: Player

    constructor(state: string) {
        this.state = state
    }
}

export class StandingLeft extends State {

    constructor(player: Player) {
        super("STANDING LEFT")
        this.player = player


    }
    enter() {
        this.player.frameY = 1
        this.player.speed = 0
        this.player.maxFrame = 6
    }
    handleInput(input: string) {
        if (input == "PRESS right")//set state to StandingRight
        {
            this.player.setState(states.RUNNING_RIGHT)
        }

        else if (input === "PRESS left") {
            this.player.setState(states.RUNNING_LEFT)
        }
        else if (input === "PRESS down") {
            this.player.setState(states.SITTING_LEFT)
        } else if (input === "PRESS up") {
            this.player.setState(states.JUMPING_LEFT)
        }
    }
}

export class StandingRight extends State {
    constructor(player: Player) {
        super("STANDING RIGHT")
        this.player = player
        
        
        
    }
    enter() {
        this.player.frameY = 0
        this.player.maxFrame = 6
        this.player.speed = 0

    }
    handleInput(input: string) {
        if (input == "PRESS left")//set state to standing left
        {
            this.player.setState(states.RUNNING_LEFT)
        }
        else if (input === "PRESS right") {
            this.player.setState(states.RUNNING_RIGHT)
        }
        else if (input == "PRESS down") {
            this.player.setState(states.SITTING_RIGHT)
        } else if (input == "PRESS up") {
            this.player.setState(states.JUMPING_RIGHT)
        }
    }
}



export class SittingRight extends State {
    constructor(player: Player) {
        super("SITTING RIGHT")
        this.player = player
        

    }
    enter() {
        this.player.frameY = 8
        this.player.maxFrame = 4
        this.player.speed = 0

    }
    handleInput(input: string) {
        if (input == "PRESS left")//set state to standing left
        {
            this.player.setState(states.STANDING_LEFT)
        }
        else if (input === "RELEASE down") {
            this.player.setState(states.STANDING_RIGHT)
        }
    }
}

export class SittingLeft extends State {
    constructor(player: Player) {
        super("SITTING LEFT")
        this.player = player
        
        
    }
    enter() {
        this.player.maxFrame = 4
        this.player.frameY = 9
        this.player.speed = 0

    }
    handleInput(input: string) {
        if (input == "PRESS right")//set state to standing left
        {
            this.player.setState(states.SITTING_RIGHT)
        }
        else if (input === "RELEASE down") {
            this.player.setState(states.STANDING_LEFT)
        }
    }
}

export class RunningLeft extends State {
    constructor(player: Player) {
        super("RUNNING LEFT")
        this.player = player

        this.player.maxFrame = 8

    }
    enter() {
        this.player.frameY = 7
        this.player.speed = -this.player.maxSpeed
    }
    handleInput(input: string) {
        if (input == "PRESS right")//set state to standing left
        {
            this.player.setState(states.RUNNING_RIGHT)
        }
        else if (input === "RELEASE left") {
            this.player.setState(states.STANDING_LEFT)
        }
        else if (input === "PRESS down") {
            this.player.setState(states.SITTING_LEFT)
        }
    }
}

export class RunningRight extends State {
    constructor(player: Player) {
        super("RUNNING RIGHT")
        this.player = player


    }
    enter() {
        this.player.frameY = 6
        this.player.speed = this.player.maxSpeed
        this.player.maxFrame = 8

    }
    handleInput(input: string) {
        if (input == "PRESS left")//set state to standing left
        {
            this.player.setState(states.RUNNING_LEFT)
        }
        else if (input === "RELEASE right") {
            this.player.setState(states.STANDING_RIGHT)
        }
        else if (input === "PRESS down") {
            this.player.setState(states.SITTING_RIGHT)
        }
    }
}


export class JumpingLeft extends State {
    constructor(player: Player) {
        super("JUMPING LEFT")
        this.player = player


    }
    enter() {
        this.player.frameY = 3
        this.player.maxFrame = 6
        if (this.player.onGround()) this.player.vY -= 20
        this.player.speed = -this.player.maxSpeed * 0.5
    }
    handleInput(input: string) {
        if (input === "PRESS right") this.player.setState(states.JUMPING_RIGHT)
        else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT)
        else if (this.player.vY > 0) this.player.setState(states.FALLING_LEFT)
    }
}

export class JumpingRight extends State {
    constructor(player: Player) {
        super("JUMPING RIGHT")
        this.player = player



    }
    enter() {
        this.player.frameY = 2
        this.player.maxFrame = 6

        if (this.player.onGround()) this.player.vY -= 20
        this.player.speed = this.player.maxSpeed * 0.5

    }
    handleInput(input: string) {
        if (input === "PRESS left") this.player.setState(states.JUMPING_LEFT)
        else if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT)
        else if (this.player.vY > 0) this.player.setState(states.FALLING_RIGHT)
    }
}


export class FallingLeft extends State {
    constructor(player: Player) {
        super("FALLING LEFT")
        this.player = player



    }
    enter() {
        this.player.frameY = 5
        this.player.maxFrame = 6


    }
    handleInput(input: string) {
        if (input === "PRESS right") this.player.setState(states.FALLING_RIGHT)
        else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT)
    }
}

export class FallingRight extends State {
    constructor(player: Player) {
        super("FALLING RIGHT")
        this.player = player



    }
    enter() {
        this.player.frameY = 4
        this.player.maxFrame = 6



    }
    handleInput(input: string) {
        if (input === "PRESS left") this.player.setState(states.FALLING_LEFT)
        else if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT)
    }
}
