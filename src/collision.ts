const canvas4: HTMLCanvasElement = document.getElementById("canvas4")
const ctx4: CanvasRenderingContext2D = canvas4.getContext("2d")
canvas4.width = 500
canvas4.height = 700
const explosions: Explosions[] = []
const canvasPosition: DOMRect = canvas4.getBoundingClientRect();


//elosive elemetns class
class Explosions {
    private x: number
    private y: number
    private spriteHeight: number
    private spriteWidth: number
    private width: number
    private height: number
    public frame: number
    private timer: number
    private angle: number
    private image: HTMLImageElement = new Image()
    private sound: HTMLAudioElement = new Audio()

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y
        this.spriteWidth = 200
        this.spriteHeight = 179
        this.width = this.spriteWidth / 2
        this.height = this.spriteHeight / 2
        this.image.src = "../assets/boom.png"
        this.frame = 0
        this.timer = 0
        this.angle = Math.random() * 6.2
        this.sound.src = "../assets/sounds/fire.wav"
    }
    public update(): void {
        this.timer++
        if (this.frame === 0) this.sound.play();
        if (this.timer % 10 === 0) this.frame++
    }
    public draw(): void {
        ctx4.save()
        ctx4.translate(this.x, this.y)
        ctx4.rotate(this.angle)
        ctx4.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width / 2, 0 - this.height / 2, this.height, this.width)
        ctx4.restore()
    }
}
const creatAnimation = (e: MouseEvent): void => {
    const positionX: number = e.x - canvasPosition.left
    const positionY: number = e.y - canvasPosition.top
    explosions.push(new Explosions(positionX, positionY))
}
window.addEventListener("click", (e: MouseEvent): void => {
    creatAnimation(e)
})

function animate(): void {
    ctx4.clearRect(0, 0, canvas4.width, canvas4.height)
    explosions.forEach((explozer: Explosions, index): void => {
        explozer.update()
        explozer.draw()
        if (explozer.frame > 5) {
            if (explosions.length != 1) {
                explosions.splice(index, 1)
            }
        }
    })
    requestAnimationFrame(animate)
}
animate()