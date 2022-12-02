import Game from "./game.js"

//parent class for all the backgrounds
export class Layer {
    protected game: Game
    private width: number
    private height: number
    private speedModifer: number
    private x = 0
    private y = 0
    private image: HTMLImageElement
    constructor(game: Game, width: number, height: number, speedModifier: number, image: HTMLImageElement) {
        this.game = game
        this.width = width
        this.height = height
        this.speedModifer = speedModifier
        this.image = image
    }

    update() {
        if (this.x < -this.width) this.x = 0
        else this.x -= this.game.speed * this.speedModifer
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}

export class Background {
    private game: Game
    private width = 1667
    private height = 500
    private layer5image = new Image()
    private layer1: Layer
    private backgroundLayers: Layer[]
    constructor(game: Game) {
        this.game = game
        this.layer5image.src = "../../assets/finalGame/layer-5.png"
        this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layer5image)
        this.backgroundLayers = [this.layer1]
    }
    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update()
        });
    }
    draw(context: CanvasRenderingContext2D) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context)
        });
    }
}