import Player from "./player.js";
import InputHandler from "./inputHandler.js";
import { Background } from "./background.js";
export default class Game {
    constructor(width, height) {
        this.speed = 3;
        this.groundMarin = 50;
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
        this.player.draw(ctx);
    }
}
