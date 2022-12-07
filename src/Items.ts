import Game from "./game.js"
export class Items {
    protected game!: Game
    public width !: number
    public height !: number
    public x !: number
    public y !: number
    protected speedX !: number
    protected speedY !: number
    protected image: HTMLImageElement = new Image()
    public markedForDeletion = false
    public speciality !: string

    update() {

        //check if item is off screen
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "red"
       if (this.game.debug) ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width * 0.5, this.height * 0.5)
    }

}
export class Boost extends Items {
    constructor(game: Game) {
        super()
        this.game = game
        this.width = 150
        this.height = 150
        this.x = this.game.width
        this.y = this.game.height - this.height - this.game.groundMarin
        this.image.src = "../assets/others/booster.png"
        this.speedX = 0
        this.speedY = 0
        this.speciality = "IncreaseBoost"
    }
    update(): void {
        super.update();
        //controlling the booster moment
        this.speedX = this.game.speed ? this.game.speed : 0
        this.x -= this.speedX
        this.speedY += 0.03
        this.y += Math.sin(this.speedY)
    }
}
export class Heart extends Items {
    constructor(game: Game) {
        super()
        this.game = game
        this.width = 150
        this.height = 150
        this.x = this.game.width
        this.y = this.game.height - this.height - this.game.groundMarin
        this.image.src = "../assets/others/heart1.png"
        this.speedX = 0
        this.speedY = 0
        this.speciality = "IncreaseLife"
    }
    update(): void {
        super.update();
        //controlling the booster moment
        this.speedX = this.game.speed ? this.game.speed : 0
        this.x -= this.speedX
        this.speedY += 0.03
        this.y += Math.sin(this.speedY)
    }
}