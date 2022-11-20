/** @type {HTMLCanvasElement} */
const canvas3: HTMLCanvasElement = document.getElementById("canvas3")
const ctx3 = canvas3.getContext("2d")
const canvas_width: number = canvas3.width = 700
const canvas_height: number = canvas3.height = 1000
const numOfEnemy: number = 10
const enemyArray: Enemy1[] = []
let GameFrame: number = 0

//enemy class

class Enemy1 {
    protected x: number
    protected y: number
    protected width: number
    protected height: number
    protected speed: number
    protected spriteWidth: number
    protected spriteHeight: number
    protected frame: number
    protected flapSpeed: number
    enemyImage: HTMLImageElement = new Image()
    constructor() {
        this.speed = Math.random() * 4 - 2
        this.spriteWidth = 293
        this.spriteHeight = 155
        this.width = this.spriteWidth / 2
        this.height = this.spriteHeight / 2
        this.frame = 0
        this.flapSpeed = Math.floor(Math.random() * 3 + 1)
        this.enemyImage.src = "../assets/enemy1.png"
        this.x = Math.random() * (canvas3.width - this.width)
        this.y = Math.random() * (canvas3.height - this.height)
    }
    public update(): void {
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5
        //frame management
        if (GameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++
        }
    }
    public draw(): void {
        ctx3?.drawImage(this.enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}
class Enemy2 extends Enemy1 {
    private angle: number = 0
    private angleSpeed: number = 0
    private curveMotion: number = 0
    constructor() {
        super()
        this.enemyImage.src = "../assets/enemy2.png"
        this.spriteWidth = 266
        this.spriteHeight = 188
        this.speed = Math.random() * 4 + 1
        this.angleSpeed = Math.random() * 0.2
        this.curveMotion = Math.random() * 7

    }
    public update(): void {
        this.x -= this.speed
        this.y += this.curveMotion * Math.sin(this.angle)
        this.angle += this.angleSpeed
        if (this.x + this.width < 0) {
            this.x = canvas3.width
        }
        if (GameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++
        }
    }

}
class Enemy3 extends Enemy2 {
    constructor() {
        super()
    }
}
//Draw specified number of enemy object from class enemy
[...Array(numOfEnemy).keys()].forEach((el: number): void => {
    enemyArray.push(new Enemy3())
})
function animate() {
    ctx3?.clearRect(0, 0, canvas_width, canvas_height)
    enemyArray.forEach((enemy: Enemy1): void => {
        enemy.update()
        enemy.draw()
    })
    GameFrame++
    // requestAnimationFrame(animate)
}
animate()