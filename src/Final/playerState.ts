import Player from "./player.js";

const enum states {
    SITTING,
    RUNNING,
    JUMPING,
    FALLING
}

class State {
    protected state: string
    constructor(state: string) {
        this.state = state;
    }
}

export class Sitting extends State {
    private player: Player
    constructor(player: Player) {
        super("SITTING")
        this.player = player
    }
    enter() {
        this.player.frameX = 0
        this.player.maxFrame = 3
        this.player.frameY = 5

    }
    handleInput(input: string[]) {
        if (input.indexOf("ArrowLeft") !== -1 || input.indexOf("ArrowRight") !== -1) {
            this.player.setState(states.RUNNING, 1)
        }

    }

}


export class Running extends State {
    private player: Player
    constructor(player: Player) {
        super("RUNNING")
        this.player = player
    }
    enter() {
        this.player.frameX = 0
        this.player.maxFrame = 6
        this.player.frameY = 3

    }
    handleInput(input: string[]) {
        if (input.indexOf("ArrowDown") !== -1) {
            this.player.setState(states.SITTING, 0)
        } else if (input.indexOf("ArrowUp") !== -1) {
            this.player.setState(states.JUMPING, 1)
        }

    }

}
export class Jumping extends State {
    private player: Player
    constructor(player: Player) {
        super("JUMPING")
        this.player = player
    }
    enter() {
        if (this.player.onGround()) this.player.vY -= 25
        this.player.frameX = 0
        this.player.maxFrame = 6
        this.player.frameY = 1

    }
    handleInput(input: string[]) {
        if (this.player.vY > 0) {
            this.player.setState(states.FALLING, 1)
        }
        if (input.indexOf("ArrowUp") !== -1) {
            this.player.setState(states.JUMPING, 1)
        }

    }

}
export class Falling extends State {
    private player: Player
    constructor(player: Player) {
        super("FALLING")
        this.player = player
    }
    enter() {
        this.player.frameX = 0
        this.player.maxFrame = 5
        this.player.frameY = 2

    }
    handleInput(input: string[]) {
        if (this.player.onGround()) {
            this.player.setState(states.RUNNING, 1)
        }
    }

}