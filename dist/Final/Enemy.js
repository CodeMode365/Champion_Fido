import Game from "./game.js";
export class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.image = new Image();
        this.markedFordDeletion = false;
    }
    update(deltaTime) {
        this.x -= this.speedX;
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
        if (this.x < 0 - this.width) {
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
export class FlyEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 60;
        this.height = 44;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image.src = "../../assets/finalGame/enemy_fly.png";
        this.angle = 0;
        this.verticalAngle = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.verticalAngle;
        this.y += Math.sin(this.angle);
    }
}
export class GroundEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 60;
        this.height = 87;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMarin;
        this.image.src = "../../assets/finalGame/enemy_plant.png";
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.speedX = this.game.speed ? this.game.speed : 0;
    }
}
export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 120;
        this.height = 144;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.image.src = "../../assets/finalGame/enemy_spider_big.png";
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;
        this.speedX = 0;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.speedX = this.game.speed ? this.game.speed : 0;
        if (this.y > this.game.height - this.height - this.game.groundMarin)
            this.speedY *= -1;
        if (this.y < -this.height)
            this.markedFordDeletion = true;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, 0);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
        ctx.stroke();
        super.draw(ctx);
    }
}
