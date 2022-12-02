import Player from "./player.js"
import InputHandler from "./inputHandler.js"
import { Background } from "./background.js"

export default class Game {
    private player: Player
    readonly width: number
    readonly height: number
    private input: InputHandler
    public groundMarin: number
    readonly speed = 3
    private background: Background

    constructor(width: number, height: number) {
        this.groundMarin = 50
        this.width = width
        this.height = height
        this.input = new InputHandler()
        this.player = new Player(this)
        this.background = new Background(this)
    }
    update(deltaTime: number) {
        this.background.update()
        this.player.update(this.input.keys, deltaTime)
    }
    draw(ctx: CanvasRenderingContext2D) {
        this.player.draw(ctx)
        // this.background.draw(ctx)
    }
}