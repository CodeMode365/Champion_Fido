import Player from "./player.js";
import InputHandler from "./inputHandler.js";
export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
    }
    update() {
        this.player.update();
    }
    draw(ctx) {
        this.player.draw(ctx);
    }
}
