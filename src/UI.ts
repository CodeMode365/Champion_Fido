import Game from "./game.js";

export class UI {
    private game: Game
    private fontSize = 30
    private fontFamily1 = "Creepster"
    private fontFamily2 = "Bangers"
    private lives = new Image()
    private darklives = new Image()
    private darkBoost = new Image()
    private boost = new Image()

    constructor(game: Game) {
        this.game = game
        this.lives.src = "../assets/others/heart1.png"
        this.boost.src = "../assets/others/booster.png"

    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        //whitning the text
        // ctx.shadowOffsetX = 2
        // ctx.shadowOffsetY = 2
        // ctx.shadowColor = 'white'
        // ctx.shadowBlur = 0

        ctx.font = this.fontSize + "px" + this.fontFamily1
        ctx.textAlign = "left"
        ctx.fillStyle = this.game.fontColor

        //score

        //timer 
        ctx.save()
        ctx.font = this.fontSize * 0.8 + 'px ' + this.fontFamily1
        ctx.fillStyle = "rgb(180,180,50)"
        ctx.fillText("Coins: " + this.game.coins, 20, 50)
        ctx.fillStyle = "rgb(170,100,140)"
        ctx.fillText("Distance Travelled: " + parseInt(this.game.distanceTraveled.toString()) + " m", this.game.width / 2 - 130, 50)
        ctx.fillStyle = "rgb(140,160,40)"
        ctx.font = this.fontSize * 0.6 + 'px ' + this.fontFamily2
        ctx.fillText("High Score: " + this.game.highScore + " m", 20, 20)
        ctx.restore()

        if (this.game.coins <= 15) {
            this.darklives.src = "../assets/others/heart1Dark.png"
            ctx.fillStyle = "rgba(80,80,80,0.2)"
        } else {
            ctx.fillStyle = "rgba(200,200,200,0.4)"
            this.darklives.src = this.lives.src
        }
        ctx.fillRect(190, 25, 50, 50)
        ctx.drawImage(this.darklives, 190 + 10, 25 + 10, 30, 30)
        if (this.game.coins <= 20) {
            ctx.fillStyle = "rgba(80,80,80,0.2)"
            this.darkBoost.src = "../assets/others/boosterDark.png"
        } else {
            ctx.fillStyle = "rgba(200,200,200,0.4)"
            this.darkBoost.src = this.boost.src
        }

        ctx.fillRect(250, 25, 50, 50)
        ctx.drawImage(this.darkBoost, 250 + 10, 25 + 10, 30, 30)
        //lives
        for (let i = 0; i < this.game.lives; i++) {
            ctx.drawImage(this.lives, 20 + i * 30, 65, 25, 25)
        }

        //gameOver message
        if (this.game.gameOver) {
            ctx.save()
            ctx.textAlign = "center"
            if (this.game.distanceTraveled > this.game.highScore) {
                localStorage.setItem("highScore", JSON.stringify(parseInt(this.game.distanceTraveled.toString())))

                ctx.fillStyle = "Black"

                ctx.font = this.fontSize * 2 + "px " + this.fontFamily1
                ctx.fillText('Boo-yah', this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2)

                ctx.font = this.fontSize * .5 + "px " + this.fontFamily1
                ctx.fillText(`What are creatures of nigt afraid of? You!!!`, this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2 + 20)
                ctx.fillText(`You got Hight Score`, this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2 + 20)
                ctx.restore()
            } else {
                ctx.fillStyle = "red"

                ctx.font = this.fontSize * 2 + "px " + this.fontFamily1
                ctx.fillText('Love at first Bite', this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2)

                ctx.font = this.fontSize * .5 + "px " + this.fontFamily1
                ctx.fillText(`Nope, Better luck next time`, this.game.width * 0.5 - this.fontSize / 2, this.game.height * 0.5 - this.fontSize / 2 + 20)
                ctx.restore()
            }
        }



        ctx.restore()
    }
}