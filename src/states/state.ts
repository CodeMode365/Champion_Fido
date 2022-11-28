import Player from "./Player.js"
import InputHandler from "./input"

export const enum states {
    STANDING_LEFT = 0,
    STANDING_RIGHT = 1
}

class State {
    private state
    protected player !: Player
    constructor(state: string) {
        this.state = state
    }
}

class StandingLeft extends State {

    constructor(player: Player) {
        super("STANDING LEFT")
        this.player = player

    }
    enter() {
        this.player.frameY = 1
    }
    handleInput(input: string) {
        if (input == "PRESS right")//set state to StandingRight
        {
            this.player.setState(1)
        }

    }
}

class StandingRight extends State {
    constructor(player: Player) {
        super("STANDING RIGHT")
        this.player = player

    }
    enter() {
        this.player.frameY = 0

    }
    handleInput(input: string) {
        if (input == "PRESS left")//set state to standing left
        {
            this.player.setState()
        }
    }
}