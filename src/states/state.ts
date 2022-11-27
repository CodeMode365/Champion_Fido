import Player from "./Player.js"
import InputHandler from "./input"

export enum states {
    STANDING_LEFT,
    STANDING_RIGHT
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
        this.player.frameY=1
    }
    handleInput(input: InputHandler) {

    }
}

class StandingRight extends State {
    constructor(player: Player) {
        super("STANDING RIGHT")
        this.player = player

    }
    enter() {

    }
    handleInput(input: InputHandler) {

    }
}