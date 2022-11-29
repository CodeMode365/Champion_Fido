import Player from "./Player.js";
class State {
    constructor(state) {
        this.state = state;
    }
}
export class StandingLeft extends State {
    constructor(player) {
        super("STANDING LEFT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 1;
        this.player.speed = 0;
        this.player.maxFrame = 6;
    }
    handleInput(input) {
        if (input == "PRESS right") {
            this.player.setState(5);
        }
        else if (input === "PRESS left") {
            this.player.setState(4);
        }
        else if (input === "PRESS down") {
            this.player.setState(2);
        }
        else if (input === "PRESS up") {
            this.player.setState(6);
        }
    }
}
export class StandingRight extends State {
    constructor(player) {
        super("STANDING RIGHT");
        this.player = player;
        this.player.maxFrame = 6;
    }
    enter() {
        this.player.frameY = 0;
        this.player.speed = 0;
    }
    handleInput(input) {
        if (input == "PRESS left") {
            this.player.setState(4);
        }
        else if (input === "PRESS right") {
            this.player.setState(5);
        }
        else if (input == "PRESS down") {
            this.player.setState(3);
        }
        else if (input == "PRESS up") {
            this.player.setState(7);
        }
    }
}
export class SittingRight extends State {
    constructor(player) {
        super("SITTING RIGHT");
        this.player = player;
        this.player.maxFrame = 4;
    }
    enter() {
        this.player.frameY = 8;
        this.player.speed = 0;
    }
    handleInput(input) {
        if (input == "PRESS left") {
            this.player.setState(0);
        }
        else if (input === "RELEASE down") {
            this.player.setState(1);
        }
    }
}
export class SittingLeft extends State {
    constructor(player) {
        super("SITTING LEFT");
        this.player = player;
        this.player.maxFrame = 4;
    }
    enter() {
        this.player.frameY = 9;
        this.player.speed = 0;
    }
    handleInput(input) {
        if (input == "PRESS right") {
            this.player.setState(3);
        }
        else if (input === "RELEASE down") {
            this.player.setState(0);
        }
    }
}
export class RunningLeft extends State {
    constructor(player) {
        super("RUNNING LEFT");
        this.player = player;
        this.player.maxFrame = 8;
    }
    enter() {
        this.player.frameY = 7;
        this.player.speed = -this.player.maxSpeed;
    }
    handleInput(input) {
        if (input == "PRESS right") {
            this.player.setState(5);
        }
        else if (input === "RELEASE left") {
            this.player.setState(0);
        }
        else if (input === "PRESS down") {
            this.player.setState(2);
        }
    }
}
export class RunningRight extends State {
    constructor(player) {
        super("RUNNING RIGHT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 6;
        this.player.speed = this.player.maxSpeed;
        this.player.maxFrame = 8;
    }
    handleInput(input) {
        if (input == "PRESS left") {
            this.player.setState(4);
        }
        else if (input === "RELEASE right") {
            this.player.setState(1);
        }
        else if (input === "PRESS down") {
            this.player.setState(3);
        }
    }
}
export class JumpingLeft extends State {
    constructor(player) {
        super("JUMPING LEFT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 3;
        this.player.maxFrame = 6;
        if (this.player.onGround())
            this.player.vY -= 20;
        this.player.speed = -this.player.maxSpeed * 0.5;
    }
    handleInput(input) {
        if (input === "PRESS right")
            this.player.setState(7);
        else if (this.player.onGround())
            this.player.setState(0);
        else if (this.player.vY > 0)
            this.player.setState(8);
    }
}
export class JumpingRight extends State {
    constructor(player) {
        super("JUMPING RIGHT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 2;
        this.player.maxFrame = 6;
        if (this.player.onGround())
            this.player.vY -= 20;
        this.player.speed = this.player.maxSpeed * 0.5;
    }
    handleInput(input) {
        if (input === "PRESS left")
            this.player.setState(6);
        else if (this.player.onGround())
            this.player.setState(1);
        else if (this.player.vY > 0)
            this.player.setState(9);
    }
}
export class FallingLeft extends State {
    constructor(player) {
        super("FALLING LEFT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 5;
        this.player.maxFrame = 6;
    }
    handleInput(input) {
        if (input === "PRESS right")
            this.player.setState(9);
        else if (this.player.onGround())
            this.player.setState(0);
    }
}
export class FallingRight extends State {
    constructor(player) {
        super("FALLING RIGHT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 4;
        this.player.maxFrame = 6;
    }
    handleInput(input) {
        if (input === "PRESS left")
            this.player.setState(8);
        else if (this.player.onGround())
            this.player.setState(1);
    }
}
