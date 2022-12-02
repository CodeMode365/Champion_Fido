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
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

export class Background {
    private game: Game
    private width = 1667
    private height = 500
    private layer1image = new Image()
    private layer2image = new Image()
    private layer3image = new Image()
    private layer4image = new Image()
    private layer5image = new Image()
    private layer1: Layer
    private layer2: Layer
    private layer3: Layer
    private layer4: Layer
    private layer5: Layer
    // private layer3: Layer
    // private layer4: Layer
    private backgroundLayers: Layer[]
    constructor(game: Game) {
        this.game = game
        this.layer1image.src = "../../assets/finalGame/layer-1.png"
        this.layer2image.src = "../../assets/finalGame/layer-2.png"
        this.layer3image.src = "../../assets/finalGame/layer-3.png"
        this.layer4image.src = "../../assets/finalGame/layer-4.png"
        this.layer5image.src = "../../assets/finalGame/layer-5.png"
        this.layer1 = new Layer(this.game, this.width, this.height, 0.1, this.layer1image)
        this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2image)
        this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3image)
        this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4image)
        this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5image)
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4,this.layer5,]
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