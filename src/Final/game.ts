import Player from "./player.js"
import InputHandler from "./inputHandler.js"
import { Background } from "./background.js"

export default class Game {
    private player: Player
    readonly width: number
    readonly height: number
    private input: InputHandler
    public groundMarin: number
    public speed = 0
    private background: Background
    public maxSpeed = 6

    constructor(width: number, height: number) {
        this.groundMarin = 80
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
        this.background.draw(ctx)
        this.player.draw(ctx)
    }
}