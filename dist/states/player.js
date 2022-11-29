import { StandingLeft, StandingRight, SittingLeft, SittingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight, FallingLeft, FallingRight } from "./state.js";
import InputHandler from "./input.js";
export default class Player {
    constructor(gameWidth, gameHeight) {
        this.states = [new StandingLeft(this), new StandingRight(this), new SittingLeft(this), new SittingRight(this), new RunningLeft(this), new RunningRight(this), new JumpingLeft(this), new JumpingRight(this), new FallingLeft(this), new FallingRight(this)];
        this.currentState = this.states[0];
        this.width = 200;
        this.height = 181.83;
        this.image = new Image();
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.vY = 0;
        this.weight = 0.5;
        this.maxFrame = 5;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.x = this.gameWidth / 2 - this.width / 2;
        this.y = gameHeight - this.height;
        this.image.src = "../assets/white_dog.png";
    }
    update(input) {
        var _a;
        (_a = this.currentState) === null || _a === void 0 ? void 0 : _a.handleInput(input);
        this.x += this.speed;
        if (this.x <= 0)
            this.x = 0;
        else if (this.x >= this.gameWidth - this.width)
            this.x = this.gameWidth - this.width;
        this.y += this.vY;
        if (!this.onGround()) {
            this.vY += this.weight;
        }
        else {
            this.vY = 0;
        }
        if (this.y > this.gameHeight - this.height)
            this.y = this.gameHeight - this.height;
    }
    draw(ctx) {
        if (this.frameX < this.maxFrame)
            this.frameX++;
        else
            this.frameX = 0;
        ctx.drawImage(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    setState(state) {
        var _a;
        this.currentState = this.states[state];
        (_a = this.currentState) === null || _a === void 0 ? void 0 : _a.enter();
    }
    onGround() {
        return this.y >= this.gameHeight - this.height;
    }
}
