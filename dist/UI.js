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
        ctx.save();
        ctx.font = this.fontSize * 0.8 + 'px ' + this.fontFamily1;
        ctx.fillStyle = "rgb(180,180,50)";
        ctx.fillText("Coins: " + this.game.coins, 20, 50);
        ctx.fillStyle = "rgb(170,100,140)";
        ctx.fillText("Distance Travelled: " + parseInt(this.game.distanceTraveled.toString()) + " m", this.game.width / 2 - 130, 50);
        ctx.fillStyle = "rgb(140,160,40)";
        ctx.font = this.fontSize * 0.6 + 'px ' + this.fontFamily2;
        ctx.fillText("High Score: " + this.game.highScore + " m", 20, 20);
        ctx.restore();
        for (let i = 0; i < this.game.lives; i++) {
            ctx.drawImage(this.lives, 20 + i * 30, 65, 25, 25);
        }
        if (this.game.gameOver) {
            ctx.save();
            ctx.textAlign = "center";
            if (this.game.distanceTraveled > this.game.highScore) {
                localStorage.setItem("highScore", JSON.stringify(parseInt(this.game.distanceTraveled.toString())));
                ctx.fillStyle = "Black";
                ctx.font = this.fontSize * 2 + "px " + this.fontFamily1;
                ctx.fillText('Boo-yah', this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2);
                ctx.font = this.fontSize * .5 + "px " + this.fontFamily1;
                ctx.fillText(`What are creatures of nigt afraid of? You!!!`, this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2 + 20);
                ctx.fillText(`You got Hight Score`, this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2 + 20);
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
