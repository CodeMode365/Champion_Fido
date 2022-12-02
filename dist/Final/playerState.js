import Player from "./player.js";
class State {
    constructor(state) {
        this.state = state;
    }
}
export class Sitting extends State {
    constructor(player) {
        super("SITTING");
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 3;
        this.player.frameY = 5;
    }
    handleInput(input) {
        if (input.indexOf("ArrowLeft") !== -1 || input.indexOf("ArrowRight") !== -1) {
            this.player.setState(1);
        }
    }
}
export class Running extends State {
    constructor(player) {
        super("RUNNING");
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 6;
        this.player.frameY = 3;
    }
    handleInput(input) {
        if (input.indexOf("ArrowDown") !== -1) {
            this.player.setState(0);
        }
        else if (input.indexOf("ArrowUp") !== -1) {
            this.player.setState(2);
        }
    }
}
export class Jumping extends State {
    constructor(player) {
        super("JUMPING");
        this.player = player;
    }
    enter() {
        if (this.player.onGround())
            this.player.vY -= 30;
        this.player.frameX = 0;
        this.player.maxFrame = 6;
        this.player.frameY = 1;
    }
    handleInput(input) {
        if (this.player.vY > 0) {
            this.player.setState(3);
        }
        if (input.indexOf("ArrowUp") !== -1) {
            this.player.setState(2);
        }
    }
}
export class Falling extends State {
    constructor(player) {
        super("FALLING");
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 5;
        this.player.frameY = 2;
    }
    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(1);
        }
    }
}
