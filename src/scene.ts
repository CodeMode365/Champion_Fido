const canvas1 = document.getElementById("sceneCanvas")
const CTX = canvas1?.getContext("2d")

const canvasHeight: number = canvas1?.height = 700
const canvasWidth: number = canvas1?.width = 800
let gameSpeed: number = 15;
// let gameFrame: number = 0
const slider: (HTMLInputElement | HTMLElement) = document.getElementById('slider')
const speedOutput = document.getElementById("showGameSpeed")
slider.addEventListener('change', (e): void => {
    gameSpeed = e.target.value
    // speedOutput?.innerText = gameSpeed
})

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

window.addEventListener("load", () => {

    /* looping the scene */
    let x: number = 0
    let x2: number = 2400
    //Class for each scene 

    class Layer {
        private x: number
        // private x2: number
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
            this.height = 700
            // this.x2 = this.width
            this.image = image
            this.speedModifier = speedModifier
            this.speed = gameSpeed * this.speedModifier
        }
        public update(): void {
            this.speed = gameSpeed * this.speedModifier


            if (this.x <= -this.width) {
                this.x = 0
            }
            this.x = this.x - this.speed
            // this.x = gameFrame * this.speed % this.width

        }
        public draw() {
            CTX.drawImage(this.image, this.x, this.y, this.width, this.height)
            CTX.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
        }

    }
    const layer1: Layer = new Layer(backgroundLayer1, .5)
    const layer2: Layer = new Layer(backgroundLayer2, .4)
    const layer3: Layer = new Layer(backgroundLayer3, .4)
    const layer4: Layer = new Layer(backgroundLayer4, .2)
    const layer5: Layer = new Layer(backgroundLayer5, 1)
    const gameObject: Layer[] = [layer1, layer2, layer3, layer4, layer5]

    function animateScene(): void {
        CTX.clearRect(0, 0, canvasWidth, canvasHeight)
        gameObject.forEach(object => {
            object.update()
            object.draw()
        })
        // gameFrame--
        requestAnimationFrame(animateScene)
    }
    animateScene()
})