import Game from "./game.js"

export class Enemy {
    private frameX = 0
    private frameY = 0
    private fps = 20
    private frameInterval = 1000 / this.fps
    private frameTimer = 0
    protected game!: Game
    protected width !: number
    protected height !: number
    protected x !: number
    protected y !: number
    protected speedX !: number
    protected speedY !: number
    protected maxFrame !: number
    protected image: HTMLImageElement = new Image()


    update(deltaTime: number) {
        //movement
        this.x -= this.speedX
        // this.y += this.speedY

        //framing fps
        if (this.frameInterval > this.frameInterval) {
            if (this.frameX < this.frameInterval) this.frameX++
            else this.frameX = 0
            this.frameTimer = 0
        } else {
            this.frameInterval += deltaTime
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
    }

}

export class FlyEnemy extends Enemy {
    constructor(game: Game) {
        super()
        this.game = game
        this.width = 60
        this.height = 44
        this.x = this.game.width + this.width
        this.y = 50
        this.speedX = 2
        this.speedY = Math.random() * this.game.height * 0.5
        this.maxFrame = 5
        this.image.src = "../../assets/finalGame/enemy_ghost_3.png"
    }
    update(deltaTime: number): void {
        super.update(deltaTime)

    }
}
export class GroundEnemy extends Enemy {
    constructor() {
        super()
    }
}
export class ClimbingEnemy extends Enemy {
    constructor() {
        super()
    }
}