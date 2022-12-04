import { Dust, Particle, Fire } from "./Particles.js";
import Game from "./game.js";
import Player from "./player.js";

const enum states {
    SITTING,
    RUNNING,
    JUMPING,
    FALLING,
    ROLLING,
    DIVING,
    HIT
}

export class State {
    handleInput(input: string[]) {
        throw new Error("Method not implemented.");
    }
    protected state: string
    protected game: Game
    constructor(state: string, game: Game) {
        this.state = state;
        this.game = game
    }
}

export class Sitting extends State {
    constructor(game: Game) {
        super("SITTING", game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.maxFrame = 4
        this.game.player.frameY = 5

    }
    handleInput(input: string[]) {
        if (input.indexOf("ArrowLeft") !== -1 || input.indexOf("ArrowRight") !== -1) {
            this.game.player.setState(states.RUNNING, 1)
        } else if (input.indexOf("Enter") !== -1) {
            this.game.player.setState(states.ROLLING, 2)
        }

    }

}


export class Running extends State {
    constructor(game: Game) {
        super("RUNNING", game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.maxFrame = 7
        this.game.player.frameY = 3

    }
    handleInput(input: string[]) {
        //adding new particles when running
        this.game.particles.push(new Dust(this.game, this.game.player.x + this.game.player.width / 2, this.game.player.y + this.game.player.height / 2))
        if (input.indexOf("ArrowDown") !== -1) {
            this.game.player.setState(states.SITTING, 0)
        } else if (input.indexOf("ArrowUp") !== -1) {
            this.game.player.setState(states.JUMPING, 1)
        }
        else if (input.indexOf("Enter") !== -1) {
            this.game.player.setState(states.ROLLING, 2)
        }
        else if (input.indexOf("Enter") !== -1) {
            this.game.player.setState(states.ROLLING, 2)
        }


    }

}
export class Jumping extends State {
    constructor(game: Game) {
        super("JUMPING", game)
    }
    enter() {
        if (this.game.player.onGround()) this.game.player.vY -= 25
        this.game.player.frameX = 0
        this.game.player.maxFrame = 7
        this.game.player.frameY = 1

    }
    handleInput(input: string[]) {
        if (this.game.player.vY > 0) {
            this.game.player.setState(states.FALLING, 1)
        }
        if (input.indexOf("ArrowUp") !== -1) {
            this.game.player.setState(states.JUMPING, 1)
        }
        else if (input.indexOf("Enter") !== -1) {
            this.game.player.setState(states.ROLLING, 2)
        }
        else if (input.indexOf("Enter") !== -1) {
            this.game.player.setState(states.ROLLING, 2)
        }
    }

}
export class Falling extends State {
    constructor(game: Game) {
        super("FALLING", game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.maxFrame = 7
        this.game.player.frameY = 2

    }
    handleInput(input: string[]) {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1)
        }
    }

}
export class Rolling extends State {
    constructor(game: Game) {
        super("ROLLING", game)
    }
    enter() {
        this.game.player.frameX = 0
        this.game.player.maxFrame = 6
        this.game.player.frameY = 6
    }
    handleInput(input: string[]) {
        //adding firing particles
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height *0.5))
        //handling user input
        if (input.indexOf("Enter") === -1 && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1)
        }
        else if (input.indexOf("Enter") === -1 && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1)
        }
        else if (input.indexOf("Enter") !== -1 && input.indexOf("ArrowUp") !== -1 && this.game.player.onGround()) {
            this.game.player.vY -= 27
        }

    }

}