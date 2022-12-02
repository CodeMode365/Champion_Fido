import Game from "./game.js";
import { Sitting, Running, Jumping, Falling } from "./playerState.js";
export default class Player {
    constructor(game) {
        var _a;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.weight = 1;
        this.vY = 0;
        this.image = new Image();
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.game = game;
        this.image.src = "../../assets/finalGame/playerDog.png";
        this.y = this.game.height - this.height;
        (_a = this.currentState) === null || _a === void 0 ? void 0 : _a.enter();
    }
    update(input, deltaTime) {
        var _a;
        (_a = this.currentState) === null || _a === void 0 ? void 0 : _a.handleInput(input);
        if (input.indexOf('ArrowRight') !== -1)
            this.speed = this.maxSpeed;
        else if (input.indexOf('ArrowLeft') != -1)
            this.speed = -this.maxSpeed;
        else
            this.speed = 0;
        this.x += this.speed;
        this.y += this.vY;
        if (this.y > this.game.height - this.height) {
            this.y = this.game.height - this.height;
        }
        if (this.x <= 0)
            this.x = 0;
        else if (this.x >= this.game.width - this.width)
            this.x = this.game.width - this.width;
        if (!this.onGround())
            this.vY += this.weight;
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX <= this.maxFrame) {
                this.frameX++;
            }
            else {
                this.frameX = 0;
            }
            this.frameTimer = 0;
        }
        else {
            this.frameTimer += deltaTime;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - this.height;
    }
    setState(state) {
        var _a;
        this.currentState = this.states[state];
        (_a = this.currentState) === null || _a === void 0 ? void 0 : _a.enter();
    }
}
