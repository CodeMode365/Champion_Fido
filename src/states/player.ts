export default class Player {
    private gameWidth: number
    private gameHeight: number
    private states: string[]
    private currentState: string
    private width = 200
    private height = 181.83
    private image: HTMLImageElement = new Image()
    private x: number
    private y: number
    public frameX = 0
    public frameY = 0

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.x = this.gameWidth / 2 - this.width / 2
        this.y = gameHeight - this.height
        // this.currentState = this.states[0]
        this.image.src = "../assets/white_dog.png"

    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height)
    }
}


