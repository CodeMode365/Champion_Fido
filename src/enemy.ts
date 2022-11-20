/** @type {HTMLCanvasElement} */
const canvas3 = document.getElementById("canvas3")
const ctx3 = canvas3.getContext("2d")
const canvas_width: number = canvas3.width = 700
const canvas_height: number = canvas3.height = 1000
const numOfEnemy: number = 20
const enemyArray: Enemy[] = []
let GameFrame: number = 0

//enemy class
class Enemy {
    private x: number
    private y: number
    private width: number
    private height: number
    private speed: number
    private spriteWidth: number
    private spriteHeight: number
    private frame: number
    private flapSpeed: number
    private enemyImage: HTMLImageElement = new Image()
    constructor() {
        this.speed = Math.random() * 4 - 2
        this.spriteWidth = 293
        this.spriteHeight = 155
        this.height = this.spriteHeight / 2
        this.width = this.spriteHeight / 1.2
        this.frame = 0
        this.flapSpeed = Math.floor(Math.random() * 3 + 1)
        this.enemyImage.src = "../assets/enemy1.png"
        this.x = Math.random() * (canvas_height - this.width)
        this.y = Math.random() * (canvas_height - this.height)
    }
    public update() {
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5
        //frame management
        if (GameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++
        }
    }
    public draw() {
        ctx3.drawImage(this.enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}
//Draw specified number of enemy object from class enemy
[...Array(numOfEnemy).keys()].forEach((el: number): void => {
    enemyArray.push(new Enemy())
})
function animate() {
    ctx3.clearRect(0, 0, canvas_width, canvas_height)
    enemyArray.forEach((enemy: Enemy): void => {
        enemy.update()
        enemy.draw()
    })
    GameFrame++
    requestAnimationFrame(animate)
}
animate()