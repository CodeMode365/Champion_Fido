import Game from "./game.js";
export class Advantage {
    constructor() {
        this.image = new Image();
        this.markedFordDeletion = false;
    }
    update() {
        this.x -= this.speedX;
        if (this.x < 0 - this.width) {
            this.markedFordDeletion = true;
        }
    }
    draw(ctx) {
        ctx.fillStyle = "red";
        if (this.game.debug)
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}
export class Potion extends Advantage {
    constructor(game) {
        super();
        this.game = game;
        this.width = 50;
        this.height = 50;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMarin;
        this.image.src = "../assets/others/booster.png";
        this.speedX = 0;
    }
    update() {
        super.update();
        this.speedX = this.game.speed ? this.game.speed : 0;
    }
}
