import Player from "./player.js"
import InputHandler from "./inputHandler.js"

export default class Game {
    private player: Player
    readonly width: number
    readonly height: number
    private input:InputHandler

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.player = new Player(this)
    }
    update() {
        this.player.update()
    }
    draw(ctx: CanvasRenderingContext2D) {
        this.player.draw(ctx)
    }
}