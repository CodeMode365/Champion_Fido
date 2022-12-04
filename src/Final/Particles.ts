import Game from "./game.js"

export class Particle {
    public markedForDeletion = false
    protected game: Game
    protected x !: number
    protected y !: number
    protected size !: number
    protected speedX !: number
    protected speedY !: number
    protected color !: string
    protected image: HTMLImageElement = new Image()


    constructor(game: Game) {
        this.game = game
    }
    update() {
        this.x -= this.speedX + this.game.speed
        this.y -= this.speedY
        this.size *= 0.95
        if (this.size < 0.5) this.markedForDeletion = true
    }
    draw(ctx: CanvasRenderingContext2D) {

    }

}

export class Dust extends Particle {
    constructor(game: Game, x: number, y: number) {
        super(game)
        this.size = Math.random() * 10 + 10
        this.x = x
        this.y = y
        this.speedX = Math.random()
        this.speedY = Math.random()
        this.color = 'rgba(0,0,0,.2)'
    }
    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}
export class Splash extends Particle {

}
export class Fire extends Particle {
    private verticalAngle: number
    private angle: number
    constructor(game: Game, x: number, y: number) {
        super(game)
        this.game = game
        this.x = x
        this.y = y
        this.speedX = 1
        this.speedY = 1
        this.angle = 0
        this.size = Math.random() * 100 + 50
        this.image.src = "../../assets/finalGame/fire.png"
        this.verticalAngle = Math.random() * 0.2 - 0.1

    }
    update(): void {
        super.update()
        this.angle += this.verticalAngle
        this.x += Math.sin(this.angle * 5)
    }
    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx)
        ctx.save()
        ctx.translate
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size)
        ctx.restore()
    }
}