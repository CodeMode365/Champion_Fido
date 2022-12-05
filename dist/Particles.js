import Game from "./game.js";
export class Particle {
    constructor(game) {
        this.markedForDeletion = false;
        this.image = new Image();
        this.game = game;
    }
    update() {
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.95;
        if (this.size < 0.5)
            this.markedForDeletion = true;
    }
    draw(ctx) {
    }
}
export class Dust extends Particle {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = 'rgba(0,0,0,0.2)';
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
export class Splash extends Particle {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 100 + 100;
        this.x = x - this.size * 0.4;
        this.y = y - this.size * 0.5;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 2 + 2;
        this.image.src = "../../assets/finalGame/fire.png";
        this.gravity = 0;
    }
    update() {
        super.update();
        this.gravity += 0.1;
        this.y += this.gravity;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}
export class Fire extends Particle {
    constructor(game, x, y) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;
        this.speedX = 1;
        this.speedY = 1;
        this.angle = 0;
        this.size = Math.random() * 100 + 50;
        this.image.src = "../../assets/finalGame/fire.png";
        this.verticalAngle = Math.random() * 0.2 - 0.1;
    }
    update() {
        super.update();
        this.angle += this.verticalAngle;
        this.x += Math.sin(this.angle * 5);
    }
    draw(ctx) {
        super.draw(ctx);
        ctx.save();
        ctx.translate;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
        ctx.restore();
    }
}
