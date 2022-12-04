import { Enemy } from "./Enemy.js";
import Game from "./game.js";
import { Sitting, Running, Jumping, Falling, Rolling, State } from "./playerState.js";

export default class Player {
    private game: Game
    readonly width = 100
    readonly height = 91.3
    public x = 0
    public y: number
    private speed = 0
    private maxSpeed = 3
    private weight = 1
    public vY = 0
    private image: HTMLImageElement = new Image()
    //framing variables
    public frameX = 0
    public frameY = 0
    public maxFrame = 5
    private fps = 20
    private frameInterval = 1000 / this.fps
    private frameTimer = 0

    //state helpers
    public states !: (Sitting | Running | Jumping | Falling | Rolling)[]
    public currentState ?: (Sitting | Running | Jumping | Falling | Rolling)


    constructor(game: Game,) {
        this.game = game
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game)]
        this.image.src = "../../assets/finalGame/playerDog.png"
        this.y = this.game.height - this.height - this.game.groundMarin
    }
    update(input: string[], deltaTime: number) {
        //update current state 
        this.currentState?.handleInput(input)

        //player movement
        this.x += this.speed
        if (input.indexOf('ArrowRight') !== -1) this.speed = this.maxSpeed
        else if (input.indexOf('ArrowLeft') != -1) this.speed = -this.maxSpeed
        else this.speed = 0

        //max horizontal movement area
        this.y += this.vY;
        if (this.y > this.game.height - this.height - this.game.groundMarin) {
            this.y = this.game.height - this.height - this.game.groundMarin
        }
        if (this.x <= 0) this.x = 0
        else if (this.x >= this.game.width - this.width) this.x = this.game.width - this.width

        //max vertical movement area
        //vertical movement(jump)
        if (!this.onGround()) this.vY += this.weight


        //framing
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) {
                this.frameX++
            } else {
                this.frameX = 0
            }
            this.frameTimer = 0
        } else {
            this.frameTimer += deltaTime
        }
        //check for collision
        this.checkCollision()
    }
    draw(ctx: CanvasRenderingContext2D) {
        // ctx.fillRect(this.x,this.y, this.width, this.height)
        ctx.fillStyle = "red"
        if (this.game.debug) ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMarin
    }
    setState(state: number, speed: number) {
        this.currentState = this.states[state]
        this.game.speed = this.game.maxSpeed * speed
        this.currentState?.enter()
    }
    checkCollision() {
        this.game.enemies.forEach((enemy: Enemy) => {
            if (enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y) {
                //colide
                enemy.markedFordDeletion = true
                this.game.score++
            } else {

            }
        })
    }
}