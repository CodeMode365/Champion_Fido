import Game from "./game.js";
export class UI {
    constructor(game) {
        this.fontSize = 40;
        this.fontFamily = "HElvetica";
        this.game = game;
    }
    draw(ctx) {
        ctx.font = this.fontSize + "px" + this.fontFamily;
        ctx.textAlign = "left";
        ctx.fillStyle = this.game.fontColor;
        ctx.fillText("Score: " + this.game.score, 20, 50);
    }
}
