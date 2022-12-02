import Game from "./game.js";
import { Sitting, Running, Jumping, Falling } from "./playerState.js";

export default class Player {
    private game: Game
    private width = 100
    private height = 91.3
    private x = 0
    private y: number
    private speed = 0
    private maxSpeed = 10
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
    private states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)]
    public currentState = this.states[0]


    constructor(game: Game,) {
        this.game = game
        this.image.src = "../../assets/finalGame/playerDog.png"
        this.y = this.game.height - this.height
        this.currentState?.enter()

    }
    update(input: string[], deltaTime: number) {
        //update current state 
        this.currentState?.handleInput(input)

        //player movement
        if (input.indexOf('ArrowRight') !== -1) this.speed = this.maxSpeed
        else if (input.indexOf('ArrowLeft') != -1) this.speed = -this.maxSpeed
        else this.speed = 0
        this.x += this.speed

        //max horizontal movement area
        this.y += this.vY;
        if (this.y > this.game.height - this.height) {
            this.y = this.game.height - this.height
        }
        if (this.x <= 0) this.x = 0
        else if (this.x >= this.game.width - this.width) this.x = this.game.width - this.width

        //max vertical movement area
        //vertical movement(jump)
        if (!this.onGround()) this.vY += this.weight


        //framing
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX <= this.maxFrame) {
                this.frameX++
            } else {
                this.frameX = 0
            }
            this.frameTimer = 0
        } else {
            this.frameTimer += deltaTime
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        // ctx.fillRect(this.x,this.y, this.width, this.height)
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    onGround() {
        return this.y >= this.game.height - this.height
    }
    setState(state: number) {
        this.currentState = this.states[state]
        this.currentState?.enter()
    }
}