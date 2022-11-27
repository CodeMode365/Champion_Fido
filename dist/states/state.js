import Player from "./Player.js";
import InputHandler from "./input";
export var states;
(function (states) {
    states[states["STANDING_LEFT"] = 0] = "STANDING_LEFT";
    states[states["STANDING_RIGHT"] = 1] = "STANDING_RIGHT";
})(states || (states = {}));
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
    }
}
class StandingRight extends State {
    constructor(player) {
        super("STANDING RIGHT");
        this.player = player;
    }
    enter() {
    }
    handleInput(input) {
    }
}
