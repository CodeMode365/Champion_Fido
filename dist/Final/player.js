import Game from "./game.js";
export default class Player {
    constructor(game) {
        this.width = 572;
        this.height = 523;
        this.x = 0;
        this.image = new Image();
        this.game = game;
        this.image.src = "../../assets/shadow_dog.png";
        this.y = this.game.height - this.height / 4;
    }
    update() {
        this.x++;
    }
    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width / 4, this.height / 4);
    }
}
