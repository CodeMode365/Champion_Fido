import Player from "./player.js";
import InputHandler from "./inputHandler.js";
import { Background } from "./background.js";
export default class Game {
    constructor(width, height) {
        this.speed = 0;
        this.maxSpeed = 6;
        this.groundMarin = 80;
        this.width = width;
        this.height = height;
        this.input = new InputHandler();
        this.player = new Player(this);
        this.background = new Background(this);
    }
    update(deltaTime) {
        this.background.update();
        this.player.update(this.input.keys, deltaTime);
    }
    draw(ctx) {
        this.background.draw(ctx);
        this.player.draw(ctx);
    }
}
