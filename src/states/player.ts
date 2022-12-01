import { StandingLeft, StandingRight, SittingLeft, SittingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight, FallingLeft, FallingRight } from "./state.js"
import InputHandler from "./input.js"
export default class Player {
    private gameWidth: number
    private gameHeight: number
    private states = [new StandingLeft(this), new StandingRight(this), new SittingLeft(this), new SittingRight(this), new RunningLeft(this), new RunningRight(this), new JumpingLeft(this), new JumpingRight(this), new FallingLeft(this), new FallingRight(this)]
    public currentState = this.states[0]
    private width = 200
    private height = 181.83
    private image: HTMLImageElement = new Image()
    private x: number
    private y: number
    public frameX = 0
    public frameY = 0
    public speed = 0
    public maxSpeed = 10
    public vY = 0
    public weight = 0.5
    public maxFrame = 5

    //draw image framing variable
    private fps = 20
    private frameTimer = 0
    private frameInterval = 0

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.x = this.gameWidth / 2 - this.width / 2
        this.y = gameHeight - this.height
        // this.currentState = this.states[0]
        this.image.src = "../assets/white_dog.png"
        this.frameInterval = 1000 / this.fps

    }
    update(input: string) {
        this.currentState?.handleInput(input)
        this.x += this.speed

        //game horizontal boundry management
        if (this.x <= 0) this.x = 0
        else if (this.x >= this.gameWidth - this.width) this.x = this.gameWidth - this.width

        //vertical movement(jumping)
        this.y += this.vY
        if (!this.onGround()) {
            this.vY += this.weight
        } else {
            this.vY = 0
        }

        //make sure that the player doesnot fall of the ground
        if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height
    }

    draw(ctx: CanvasRenderingContext2D, deltaTime: number) {
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) this.frameX++
            else this.frameX = 0
            this.frameTimer = 0
        } else {
            this.frameTimer += deltaTime
        }
        ctx.drawImage(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height)
    }


    setState(state: number) {
        //managing current state of player
        this.currentState = this.states[state]
        this.currentState?.enter()
    }

    onGround() {
        return this.y >= this.gameHeight - this.height
    }
}


