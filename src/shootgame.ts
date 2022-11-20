const canvaS: HTMLCanvasElement = document.getElementById("shootGame")
const ctxS: CanvasRenderingContext2D = canvaS.getContext("2d")

canvaS.width = window.innerWidth
canvaS.height = window.innerHeight

let timeToNextRaven: number = 0
const ravenIntarval: number = 500
let lastTime: number = 0

let ravens: Raven[] = []
class Raven {
    private width: number
    private height: number
    private x: number
    private y: number
    private directionX: number
    private directionY: number
    public markedForDeletion: boolean
    constructor() {
        this.width = 100
        this.height = 100
        this.x = canvaS.width
        this.y = Math.random() * (canvaS.height - this.height)
        this.directionX = Math.random() * 5 + 3
        this.directionY = Math.random() * 5 - 2.5
        this.markedForDeletion = false
    }
    public update(): void {
        this.x -= this.directionX
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true
        }
    }
    public draw(): void {
        ctxS.fillRect(this.x, this.y, this.width, this.height)
    }
}

let deletedRaven: Raven[] = []

function animate(timestamep: number): void {
    ctxS.clearRect(0, 0, canvaS.width, canvaS.height)
    const deltaTime = timestamep - lastTime
    lastTime = timestamep
    timeToNextRaven += deltaTime
    if (timeToNextRaven > ravenIntarval) {
        ravens.push(new Raven())
        timeToNextRaven = 0
    }
    [...ravens].forEach((raven: Raven): void => {
        raven.update()
    });
    [...ravens].forEach((raven: Raven): void => {
        raven.draw()
    });
    // deletedRaven = ravens.filter((rav: Raven) => {
    //     rav.markedForDeletion == true
    // })
    // console.log(deletedRaven)

    requestAnimationFrame(animate)
}

animate(0)
