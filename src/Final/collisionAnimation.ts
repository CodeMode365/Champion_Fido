import Game from "./game.js";

export class collisionAnimation {
    private game: Game
    private image: HTMLImageElement = new Image()
    private spriteWidth = 100
    private spriteHeight = 90
    private sizeModifier: number
    private width: number
    private height: number
    private x: number
    private y: number
    private frameX = 0
    public markedForDeletion = false
    private maxFrame = 4

    //framing
    private fps = 10
    private frameInterval = 1000 / this.fps
    private frameTimer = 0
    constructor(game: Game, x: number, y: number) {
        this.game = game
        this.image.src = "../../assets/finalGame/boom.png"
        this.sizeModifier = Math.random() + 0.5
        this.width = this.spriteWidth + this.sizeModifier
        this.height = this.spriteHeight + this.sizeModifier
        this.x = x - this.width + 0.5
        this.y = y - this.width * 0.5
    }
    draw(ctx: CanvasRenderingContext2D) {
        //draw the animation
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
    update(deltaTime: number) {
        this.x -= this.game.speed
        if (this.frameTimer > this.frameInterval) {
            this.frameX++
            this.frameTimer = 0
        } else {
            this.frameTimer += deltaTime
        }
        if (this.frameX > this.maxFrame) this.markedForDeletion = true
    }
}