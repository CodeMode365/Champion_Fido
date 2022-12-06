import Game from "./game.js";
export class UI {
    constructor(game) {
        this.fontSize = 30;
        this.fontFamily1 = "Creepster";
        this.fontFamily2 = "Bangers";
        this.lives = new Image();
        this.game = game;
        this.lives.src = "../assets/others/heart1.png";
    }
    draw(ctx) {
        ctx.save();
        ctx.font = this.fontSize + "px" + this.fontFamily1;
        ctx.textAlign = "left";
        ctx.fillStyle = this.game.fontColor;
        ctx.font = this.fontSize * 0.8 + 'px ' + this.fontFamily1;
        ctx.fillText("Time: " + ((this.game.maxTime - this.game.time) * 0.001).toFixed(1) + "s left", 20, 80);
        ctx.fillText("Score: " + this.game.score, 20, 50);
        for (let i = 0; i < this.game.lives; i++) {
            ctx.drawImage(this.lives, 20 + i * 30, 95, 25, 25);
        }
        if (this.game.gameOver) {
            ctx.save();
            ctx.textAlign = "center";
            if (this.game.score > this.game.targetScore) {
                ctx.fillStyle = "Black";
                ctx.font = this.fontSize * 2 + "px " + this.fontFamily1;
                ctx.fillText('Boo-yah', this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2);
                ctx.font = this.fontSize * .5 + "px " + this.fontFamily1;
                ctx.fillText(`What are creatures of nigt afraid of? You!!!`, this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2 + 20);
                ctx.restore();
            }
            else {
                ctx.fillStyle = "red";
                ctx.font = this.fontSize * 2 + "px " + this.fontFamily1;
                ctx.fillText('Love at first Bite', this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2);
                ctx.font = this.fontSize * .5 + "px " + this.fontFamily1;
                ctx.fillText(`Nope, Better luck next time`, this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2 + 20);
                ctx.restore();
            }
        }
        ctx.restore();
    }
}
