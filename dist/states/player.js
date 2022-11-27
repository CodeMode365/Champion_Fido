"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(gameWidth, gameHeight) {
        this.height = 181.83;
        this.width = 200;
        this.image = new Image();
        this.x = 0;
        this.y = 0;
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;
        this.image.src = "../assets/white_dog.png";
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}
exports.default = Player;
