import Game from "./game.js"

export class Enemy {
    private frameX = 0
    private frameY = 0
    private fps = 20
    private frameInterval = 1000 / this.fps
    private frameTimer = 0
    protected game!: Game
    public width !: number
    public height !: number
    public x !: number
    public y !: number
    protected speedX !: number
    protected speedY !: number
    protected maxFrame !: number
    protected image: HTMLImageElement = new Image()
    public markedFordDeletion = false


    update(deltaTime: number) {
        //movement
        this.x -= this.speedX
        this.y += this.speedY

        //framing fps
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) this.frameX++
            else this.frameX = 0
            this.frameTimer = 0
        } else {
            this.frameTimer += deltaTime
        }

        //check enemy is off screen
        if (this.x < 0 - this.width) {
            this.markedFordDeletion = true

        }


    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
    }

}

export class FlyEnemy extends Enemy {
    protected angle: number
    protected verticalAngle: number
    constructor(game: Game) {
        super()
        this.game = game
        this.width = 60
        this.height = 44
        this.x = this.game.width
        this.y = Math.random() * this.game.height * 0.5
        this.speedX = Math.random() + 1
        this.speedY = 0
        this.maxFrame = 5
        this.image.src = "../../assets/finalGame/enemy_fly.png"
        this.angle = 0
        this.verticalAngle = Math.random() * 0.1 + 0.1
    }
    update(deltaTime: number): void {
        super.update(deltaTime)
        this.angle += this.verticalAngle
        this.y += Math.sin(this.angle)

    }
}
export class GroundEnemy extends Enemy {
    constructor(game: Game) {
        super()
        this.game = game
        this.width = 60
        this.height = 87
        this.x = this.game.width
        this.y = this.game.height - this.height - this.game.groundMarin
        this.image.src = "../../assets/finalGame/enemy_plant.png"
        this.speedX = 0
        this.speedY = 0
        this.maxFrame = 1

    }
    update(deltaTime: number): void {
        super.update(deltaTime);

        //controlling speed of ground enemy with ground movement
        this.speedX = this.game.speed ? this.game.speed : 0

    }
}
export class ClimbingEnemy extends Enemy {
    constructor(game: Game) {
        super()
        this.game = game
        this.width = 120
        this.height = 144
        this.x = this.game.width
        this.y = Math.random() * this.game.height * 0.5
        this.image.src = "../../assets/finalGame/enemy_spider_big.png"
        this.speedX = 0
        this.speedY = Math.random() > 0.5 ? 1 : -1
        this.maxFrame = 5
        this.speedX = 0
        // this.speedY = 1
    }
    update(deltaTime: number): void {
        super.update(deltaTime)
        this.speedX = this.game.speed ? this.game.speed : 0
        if (this.y > this.game.height - this.height - this.game.groundMarin) this.speedY *= -1
        if (this.y < - this.height) this.markedFordDeletion = true

    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath()
        ctx.moveTo(this.x+this.width/2, 0)
        ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2)
        ctx.stroke()
        super.draw(ctx)
    }
}


