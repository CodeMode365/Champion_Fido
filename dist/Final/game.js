import Player from "./player.js";
import InputHandler from "./inputHandler.js";
export default class Game {
    constructor(width, height) {
        this.groundMarin = 50;
        this.width = width;
        this.height = height;
        this.input = new InputHandler();
        this.player = new Player(this);
    }
    update(deltaTime) {
        this.player.update(this.input.keys, deltaTime);
    }
    draw(ctx) {
        this.player.draw(ctx);
    }
}
