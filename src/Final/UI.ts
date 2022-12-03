import Game from "./game.js";

export class UI {
    private game: Game
    private fontSize = 40
    private fontFamily = "HElvetica"
    constructor(game: Game) {
        this.game = game
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.font = this.fontSize + "px" + this.fontFamily
        ctx.textAlign = "left"
        ctx.fillStyle = this.game.fontColor
        ctx.fillText("Score: " + this.game.score, 20, 50)
    }
}