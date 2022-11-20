
//canvas for detecting collition
const collisionCanvas: HTMLCanvasElement = document.getElementById("collisionCanvas")
const collisionCTX: CanvasRenderingContext2D = collisionCanvas.getContext("2d")

collisionCanvas.width = window.innerWidth
collisionCanvas.height = window.innerHeight

//main canavs
const canvaS: HTMLCanvasElement = document.getElementById("shootGame")
const ctxS: CanvasRenderingContext2D = canvaS.getContext("2d")

canvaS.width = window.innerWidth
canvaS.height = window.innerHeight

let timeToNextRaven: number = 0
const ravenIntarval: number = 500
let lastTime: number = 0
const score = 0

let ravens: Raven[] = []
class Raven {
    readonly width: number
    private height: number
    private x: number
    private y: number
    private directionX: number
    private directionY: number
    private creatureImage: HTMLImageElement = new Image()
    private spriteHeight: number
    private spriteWidth: number
    private sizeModifier: number
    private frame: number = 0
    private maxFrame: number = 4
    private timeSinceFlap: number
    private flapInterval: number
    private randmColor: number[]
    private GenColor: string
    public markedForDeletion: boolean
    constructor() {
        this.sizeModifier = Math.random() * 0.6 + 0.5
        this.spriteWidth = 271
        this.spriteHeight = 194
        this.width = this.spriteWidth / 2 * this.sizeModifier
        this.height = this.spriteHeight / 2 * this.sizeModifier
        this.x = canvaS.width
        this.y = Math.random() * (canvaS.height - this.height)
        this.directionX = Math.random() * 5 + 3
        this.directionY = Math.random() * 5 - 2.5
        this.markedForDeletion = false
        this.creatureImage.src = "../assets/raven.png"
        this.timeSinceFlap = 0
        this.flapInterval = Math.random() * 50 + 50
        this.randmColor = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
        this.GenColor = `rgba(${this.randmColor[0]},${this.randmColor[1]},${this.randmColor[2]},${this.randmColor[3]})`
    }
    public update(deltaTime: number): void {
        this.x -= this.directionX
        this.y += this.directionY

        if (this.y < 0 || this.y > canvaS.height - this.height) {
            this.directionY = this.directionY * -1
        }
        this.timeSinceFlap += deltaTime;
        if (this.timeSinceFlap > this.flapInterval) {
            //to load flapping frame
            if (this.frame > this.maxFrame) {
                this.frame = 0
            } else {
                this.frame++
            }
            this.timeSinceFlap = 0
        }
        //to remove the raven that passed screen
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true
        }

    }
    //draw the raven
    public draw(): void {
        collisionCTX.fillStyle = this.GenColor
        collisionCTX.fillRect(this.x, this.y, this.width, this.height)
        ctxS.drawImage(this.creatureImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }

}

//scoring
function drawScore(): void {
    ctxS.fillStyle = "white";
    ctxS.fillText("Score: " + score, 50, 75)
    ctxS.fillStyle = "whtie"
    ctxS.fillText("Score: " + score, 55, 80)

}
//clicking event
window.addEventListener("click", (e: MouseEvent) => {
    const deltectPixelColor = ctxS.getImageData(e.x, e.y, 1, 1)
    console.log(deltectPixelColor)
})

//to run the animation
function animate(timestamep: number): void {

    ctxS.clearRect(0, 0, canvaS.width, canvaS.height)
    collisionCTX.clearRect(0, 0, canvaS.width, canvaS.height)
    const deltaTime = timestamep - lastTime
    lastTime = timestamep
    timeToNextRaven += deltaTime
    drawScore()
    if (timeToNextRaven > ravenIntarval) {

        ravens.push(new Raven())
        timeToNextRaven = 0
        const newRav = new Raven()
        ravens.sort(function (a, b) {
            return a.width - b.width;
        })
    }
    [...ravens].forEach((raven: Raven): void => {
        raven.update(deltaTime)
    });
    [...ravens].forEach((raven: Raven): void => {
        raven.draw()
    });
    ravens = ravens.filter((raven: Raven) => !raven.markedForDeletion)
    requestAnimationFrame(animate)
}


animate(0)
