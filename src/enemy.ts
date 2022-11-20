/** @type {HTMLCanvasElement} */
const canvas3: HTMLCanvasElement = document.getElementById("canvas3")
const ctx3 = canvas3.getContext("2d")
const canvas_width: number = canvas3.width = 700
const canvas_height: number = canvas3.height = 1000
const numOfEnemy: number = 20
const enemyArray: Enemy1[] = []
let GameFrame: number = 0

//enemy property class

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
    protected enemyImage: HTMLImageElement = new Image()
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
    protected angle: number = 0
    protected angleSpeed: number = 0
    protected curveMotion: number = 0
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
        this.enemyImage.src = "../assets/enemy3.png"
        this.spriteWidth = 218
        this.spriteHeight = 177

        /*Hard motion*/
        // this.angleSpeed = Math.floor(Math.random() * 5 + 1)
        // this.curveMotion = Math.random() * 200 + 50

        /* antique motion */
        // this.angleSpeed = Math.floor(Math.random() * 3 + 1)
        // this.curveMotion = Math.random() * 200 + 50
        this.angleSpeed = Math.random() * 0.5 + 0.5


    }
    public update(): void {
        this.x = canvas3.width / 2 * Math.sin(this.angle * Math.PI / 90) + (canvas3.width / 2 - this.width / 2)
        this.y = canvas3.height / 2 * Math.cos(this.angle * Math.PI / 270) + (canvas3.height / 2 - this.height / 2)

        this.angle += this.angleSpeed
        if (this.x + this.width < 0) {
            this.x = canvas3.width
        }
        if (GameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++
        }
    }
}
class Enemy4 extends Enemy3 {
    private newX: number
    private newY: number
    private interval: number
    constructor() {
        super()
        this.enemyImage.src = "../assets/enemy4.png"
        this.spriteHeight = 213
        this.spriteWidth = 213
        this.newX = Math.random() * (canvas3.width - this.width)
        this.newY = Math.random() * (canvas3.width - this.width)
        this.interval = Math.floor(Math.random() * 100 + 50)
    }
    public update(): void {
        // this.x = 0
        // this.y = 0
        if (GameFrame % this.interval === 0) {
            this.newX = Math.random() * (canvas3.width - this.width)
            this.newY = Math.random() * (canvas3.width - this.width)
        }
        let dx = this.x - this.newX
        let dy = this.y - this.newY
        this.x -= dx / 70
        this.y -= dy / 70
        if (this.x + this.width < 0) {
            this.x = canvas3.width
        }
        if (GameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++
        }
    }
}
//Draw specified number of enemy object from class enemy
[...Array(numOfEnemy).keys()].forEach((el: number): void => {
    enemyArray.push(new Enemy4())
})
//animate the game
function animate() {
    ctx3?.clearRect(0, 0, canvas_width, canvas_height)
    enemyArray.forEach((enemy: Enemy1): void => {
        enemy.update()
        enemy.draw()
    })
    GameFrame++
    requestAnimationFrame(animate)
}
animate()