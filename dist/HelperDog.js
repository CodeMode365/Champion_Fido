import Game from "./game.js";
export class TeamDog {
    constructor(game) {
        this.frameX = 0;
        this.fps = 15;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.width = 121;
        this.height = 82;
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 20;
        this.image = new Image();
        this.markedFordDeletion = false;
        this.game = game;
        this.width = 121;
        this.height = 82;
        this.x = 0 - this.game.width;
        this.y = this.game.height - this.height - this.game.groundMarin - 2;
        this.image.src = "../assets/others/secDog.png";
        this.speedY = 0;
    }
    update(deltaTime) {
        this.speedX = this.game.speed * 0.8;
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame)
                this.frameX++;
            else
                this.frameX = 0;
            this.frameTimer = 0;
        }
        else {
            this.frameTimer += deltaTime;
        }
        if (this.x > this.game.width + this.width) {
            this.markedFordDeletion = true;
        }
    }
    draw(ctx) {
        ctx.fillStyle = "red";
        if (this.game.debug)
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}
