import Game from "./game.js"
export class TeamDog {
    private frameX = 0
    // private frameY = 0
    private fps = 15
    private frameInterval = 1000 / this.fps
    private frameTimer = 0
    protected game!: Game
    public width = 121
    public height = 82
    public x !: number
    public y !: number
    protected speedX: number = 0
    protected speedY = 0
    protected maxFrame = 20
    protected image: HTMLImageElement = new Image()
    public markedFordDeletion = false

    constructor(game: Game) {

        this.game = game
        this.width = 121
        this.height = 82
        this.x = 0 - this.game.width
        this.y = this.game.height - this.height - this.game.groundMarin - 2
        this.image.src = "../assets/others/secDog.png"
        // this.speedX = 2
        this.speedY = 0
    }


    update(deltaTime: number) {
        this.speedX =this.game.speed*0.8
        //movement
        this.x += this.speedX
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
        if (this.x > this.game.width + this.width) {
            this.markedFordDeletion = true

        }


        //controlling speed of ground dog with ground movement
        // this.speedX = this.game.speed ? this.game.speed : 0


    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "red"
        if (this.game.debug) ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
    }

}
