import Game from "./game.js";


export default class Player {
    private game: Game
    // private width = 100;
    private width = 572;
    // private height = 91.3;
    private height = 523;
    private x = 0
    private y: number
    private image: HTMLImageElement = new Image()
    constructor(game: Game) {
        this.game = game
        this.image.src = "../../assets/shadow_dog.png"
        this.y = this.game.height - this.height / 4
    }
    update() {
        this.x++
        // this.y--
    }
    draw(ctx: CanvasRenderingContext2D) {
        // ctx.fillRect(this.x,this.y, this.width, this.height)
        ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width / 4, this.height / 4)
    }
}