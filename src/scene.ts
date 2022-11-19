const canvas1 = document.getElementById("sceneCanvas")
const CTX = canvas1?.getContext("2d")

const canvasHeight: number = canvas1?.height = 700
const canvasWidth: number = canvas1?.width = 800
let gameSpeed: number = 5;

//backgrounds
const backgroundLayer1: HTMLImageElement = new Image()
backgroundLayer1.src = "../assets/layer-1.png"
const backgroundLayer2: HTMLImageElement = new Image()
backgroundLayer2.src = "../assets/layer-2.png"
const backgroundLayer3: HTMLImageElement = new Image()
backgroundLayer3.src = "../assets/layer-3.png"
const backgroundLayer4: HTMLImageElement = new Image()
backgroundLayer4.src = "../assets/layer-4.png"
const backgroundLayer5: HTMLImageElement = new Image()
backgroundLayer5.src = "../assets/layer-5.png"

/* looping the scene */
let x: number = 0
let x2: number = 2400
//Class for each scene 
class Layer {
    private x: number
    private x2: number
    private y: number
    private width: number
    private height: number
    private image: HTMLImageElement
    private speedModifier: number
    private speed: number
    constructor(image: HTMLImageElement, speedModifier: number) {
        this.x = 0
        this.y = 0
        this.width = 2400
        this.height = 2400
        this.x2 = this.width
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gameSpeed * this.speedModifier
        this.update()
        console.log(image)
    }
    private update(): void {
        this.speed = gameSpeed * this.speedModifier
        if (this.x <= this.width) {
            this.x = this.width + this.x2 - this.speed
        }
        if (this.x2 <= this.width) {
            this.x2 = this.width + this.x - this.speed
        }
        this.x = Math.floor(this.x - this.speed)
        this.x2 = Math.floor(this.x2 - this.speed)
    }
    public draw() {
        CTX.drawImage(this.image, this.x, this.y, this.width, this.width)
    }

}
const layer4: Layer = new Layer(backgroundLayer4, 0.5)
// console.log(layer4.))

function animateScene(): void {
    CTX.clearRect(0, 0, canvasWidth, canvasHeight)
    layer4.draw()
    requestAnimationFrame(animateScene)
}
animateScene()