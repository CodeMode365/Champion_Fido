import Game from "./game.js";
export class collisionAnimation {
    constructor(game, x, y) {
        this.image = new Image();
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.frameX = 0;
        this.markedForDeletion = false;
        this.maxFrame = 4;
        this.fps = 10;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.game = game;
        this.image.src = "../../assets/finalGame/boom.png";
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth + this.sizeModifier;
        this.height = this.spriteHeight + this.sizeModifier;
        this.x = x - this.width + 0.5;
        this.y = y - this.height * 0.5;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update(deltaTime) {
        this.x -= this.game.speed;
        if (this.frameTimer > this.frameInterval) {
            this.frameX++;
            this.frameTimer = 0;
        }
        else {
            this.frameTimer += deltaTime;
        }
        if (this.frameX > this.maxFrame)
            this.markedForDeletion = true;
    }
}
