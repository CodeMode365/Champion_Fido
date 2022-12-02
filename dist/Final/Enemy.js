import Game from "./game.js";
export class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.image = new Image();
    }
    update(deltaTime) {
        this.x -= this.speedX;
        if (this.frameInterval > this.frameInterval) {
            if (this.frameX < this.frameInterval)
                this.frameX++;
            else
                this.frameX = 0;
            this.frameTimer = 0;
        }
        else {
            this.frameInterval += deltaTime;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}
export class FlyEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 60;
        this.height = 44;
        this.x = this.game.width + this.width;
        this.y = 50;
        this.speedX = 2;
        this.speedY = Math.random() * this.game.height * 0.5;
        this.maxFrame = 5;
        this.image.src = "../../assets/finalGame/enemy_ghost_3.png";
    }
    update(deltaTime) {
        super.update(deltaTime);
    }
}
export class GroundEnemy extends Enemy {
    constructor() {
        super();
    }
}
export class ClimbingEnemy extends Enemy {
    constructor() {
        super();
    }
}
