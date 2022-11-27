export default class Player {
    private gameWidth: number
    private gameHeight: number
    // private states: string[]
    // private currentState: string
    private height = 181.83
    private width = 200
    private image: HTMLImageElement = new Image()
    private x = 0
    private y = 0


    constructor(gameWidth: number, gameHeight: number) {
        this.gameHeight = gameHeight
        this.gameWidth = gameWidth
        // this.currentState = this.states[0]
        this.image.src = "../assets/white_dog.png"

    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x, this.y)
    }
}


