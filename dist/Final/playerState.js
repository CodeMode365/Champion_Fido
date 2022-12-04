import { Dust, Particle, Fire, Splash } from "./Particles.js";
import Game from "./game.js";
import Player from "./player.js";
export class State {
    handleInput(input) {
        throw new Error("Method not implemented.");
    }
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}
export class Sitting extends State {
    constructor(game) {
        super("SITTING", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
    }
    handleInput(input) {
        if (input.indexOf("ArrowLeft") !== -1 || input.indexOf("ArrowRight") !== -1) {
            this.game.player.setState(1, 1);
        }
        else if (input.indexOf("Enter") !== -1) {
            this.game.player.setState(4, 2);
        }
    }
}
export class Running extends State {
    constructor(game) {
        super("RUNNING", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 7;
        this.game.player.frameY = 3;
    }
    handleInput(input) {
        this.game.particles.push(new Dust(this.game, this.game.player.x + this.game.player.width / 2, this.game.player.y + this.game.player.height / 2));
        if (input.indexOf("ArrowDown") !== -1) {
            this.game.player.setState(0, 0);
        }
        else if (input.indexOf("ArrowUp") !== -1) {
            this.game.player.setState(2, 1);
        }
        else if (input.indexOf("Enter") !== -1) {
            this.game.player.setState(4, 2);
        }
        else if (input.indexOf("Enter") !== -1) {
            this.game.player.setState(4, 2);
        }
    }
}
export class Jumping extends State {
    constructor(game) {
        super("JUMPING", game);
    }
    enter() {
        if (this.game.player.onGround())
            this.game.player.vY -= 25;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 7;
        this.game.player.frameY = 1;
    }
    handleInput(input) {
        if (this.game.player.vY > 0) {
            this.game.player.setState(3, 1);
        }
        if (input.indexOf("ArrowUp") !== -1) {
            this.game.player.setState(2, 1);
        }
        else if (input.indexOf("Enter") !== -1) {
            this.game.player.setState(4, 2);
        }
        else if (input.indexOf("Enter") !== -1) {
            this.game.player.setState(4, 2);
        }
        else if (input.indexOf("ArrowDown") !== -1) {
            this.game.player.setState(5, 0);
        }
    }
}
export class Falling extends State {
    constructor(game) {
        super("FALLING", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 7;
        this.game.player.frameY = 2;
    }
    handleInput(input) {
        if (this.game.player.onGround()) {
            this.game.player.setState(1, 1);
        }
        else if (input.indexOf("ArrowDown") !== -1) {
            this.game.player.setState(5, 0);
        }
    }
}
export class Rolling extends State {
    constructor(game) {
        super("ROLLING", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
    }
    handleInput(input) {
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if (input.indexOf("Enter") === -1 && this.game.player.onGround()) {
            this.game.player.setState(1, 1);
        }
        else if (input.indexOf("Enter") === -1 && !this.game.player.onGround()) {
            this.game.player.setState(3, 1);
        }
        else if (input.indexOf("Enter") !== -1 && input.indexOf("ArrowUp") !== -1 && this.game.player.onGround()) {
            this.game.player.vY -= 27;
        }
        else if (input.indexOf("ArrowDown") !== -1) {
            this.game.player.setState(5, 0);
        }
    }
}
export class Diving extends State {
    constructor(game) {
        super("DIVING", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
        this.game.player.vY = 15;
    }
    handleInput(input) {
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if (this.game.player.onGround()) {
            this.game.player.setState(1, 1);
            for (let i = 0; i < 40; i++) {
                this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width / 2, this.game.player.y + this.game.player.height));
            }
        }
        else if (input.indexOf("Enter") === -1 && this.game.player.onGround()) {
            this.game.player.setState(4, 2);
        }
    }
}
export class Hit extends State {
    constructor(game) {
        super("HIT", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.frameY = 4;
    }
    handleInput(input) {
        if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
            console.log('ground mo');
            this.game.player.setState(1, 1);
        }
        else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
            console.log('fall mo');
            this.game.player.setState(3, 1);
        }
    }
}
