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


    constructor(game: Game) {
        this.game = game
    }
    update() {
        this.x -= this.speedX + this.game.speed
        this.y -= this.speedY
        this.size *= 0.95
        if (this.size < 0.5) this.markedForDeletion = true
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
        this.color = 'black'
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}
export class Splash extends Particle {

}
export class Fire extends Particle {

}