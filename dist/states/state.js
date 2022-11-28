import Player from "./Player.js";
import InputHandler from "./input";
class State {
    constructor(state) {
        this.state = state;
    }
}
class StandingLeft extends State {
    constructor(player) {
        super("STANDING LEFT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 1;
    }
    handleInput(input) {
        if (input == "PRESS right") {
            this.player.setState(1);
        }
    }
}
class StandingRight extends State {
    constructor(player) {
        super("STANDING RIGHT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 0;
    }
    handleInput(input) {
        if (input == "PRESS left") {
            this.player.setState();
        }
    }
}
