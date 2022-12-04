import Game from "./game.js";
export class UI {
    constructor(game) {
        this.fontSize = 30;
        this.fontFamily = "HElvetica";
        this.game = game;
    }
    draw(ctx) {
        ctx.save();
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 0;
        ctx.font = this.fontSize + "px" + this.fontFamily;
        ctx.textAlign = "left";
        ctx.fillStyle = this.game.fontColor;
        ctx.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        ctx.fillText("Time: " + ((this.game.maxTime - this.game.time) * 0.001).toFixed(1) + "s left", 20, 80);
        ctx.fillText("Score: " + this.game.score, 20, 50);
        if (this.game.gameOver) {
            ctx.save();
            ctx.textAlign = "center";
            if (this.game.score > 5) {
                ctx.fillStyle = "Green";
                ctx.font = this.fontSize * 2 + "px " + this.fontFamily;
                ctx.fillText('Boo-yah', this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2);
                ctx.font = this.fontSize * .5 + "px " + this.fontFamily;
                ctx.fillText(`What are creatures of nigt afraid of? You!!!`, this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2 + 20);
                ctx.restore();
            }
            else {
                ctx.fillStyle = "red";
                ctx.font = this.fontSize * 2 + "px " + this.fontFamily;
                ctx.fillText('Love at first Bite', this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2);
                ctx.font = this.fontSize * .5 + "px " + this.fontFamily;
                ctx.fillText(`Nope, Better luck next time`, this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2 + 20);
                ctx.restore();
            }
        }
        ctx.restore();
    }
}
