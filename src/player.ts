import { Enemy } from "./Enemy.js";
import Game from "./game.js";
import { collisionAnimation } from "./collisionAnimation.js";
import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit, State } from "./playerState.js";
import { FloatingMsg } from "./floatingMsg.js";
import { Items } from "./Items.js";

export default class Player {
    private game: Game
    readonly width = 100
    readonly height = 91.3
    public x = 0
    public y: number
    public speed = 0
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

    public Music: HTMLAudioElement = new Audio()



    //state helpers
    public states !: (Sitting | Running | Jumping | Falling | Rolling)[]
    public currentState?: (Sitting | Running | Jumping | Falling | Rolling)


    constructor(game: Game,) {
        this.game = game
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)]
        this.image.src = "../assets/others/playerDog.png"
        this.y = this.game.height - this.height - this.game.groundMarin
    }
    update(input: string[], deltaTime: number) {
        //update current state 
        this.currentState?.handleInput(input)

        //player movement
        this.x += this.speed
        if (input.indexOf('ArrowRight') !== -1 && this.currentState !== this.states[6]) this.speed = this.maxSpeed
        else if (input.indexOf('ArrowLeft') != -1 && this.currentState !== this.states[6]) this.speed = -this.maxSpeed
        //stop player movent when get hit
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
        else this.vY = 0


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
        //check if player equiped an item
        this.checkItemEquip()
    }
    draw(ctx: CanvasRenderingContext2D) {
        // ctx.fillRect(this.x,this.y, this.width, this.height)
        ctx.fillStyle = "red"
        if (this.game.debug) ctx.strokeRect(this.x + 18, this.y + 18, this.width * .65, this.height * .75)
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

            if (enemy.x < this.x + 18 + this.width * .65 &&
                enemy.x + enemy.width > this.x + 18 &&
                enemy.y < this.y + 18 + this.height * .75 &&
                enemy.y + enemy.height > this.y + 18) {
                //colide
                enemy.markedFordDeletion = true
                this.game.collisions.push(new collisionAnimation(this.game, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2)
                )
                if (this.currentState == this.states[4] || this.currentState === this.states[5]) {
                    this.Music.src = "../assets/musics/platch.wav"
                    this.Music.play()

                    this.game.coins++
                    this.game.floatingMessage.push(new FloatingMsg('+1', enemy.x, enemy.y, 150, 50))
                } else {
                    this.Music.src = "../assets/musics/getHit.wav"
                    this.Music.play()
                    this.setState(6, 0)
                    this.game.lives--
                    if (this.game.lives <= 0) this.game.gameOver = true
                }
            }
        })
    }
    checkItemEquip() {
        this.game.items.forEach((item: Items) => {
            if (item.x < this.x + this.width &&
                item.x + item.width * .5 > this.x &&
                item.y < this.y + this.height  &&
                item.y + item.height * .5 > this.y) {
                item.markedForDeletion = true
                this.Music.src = "../assets/musics/coins.wav"
                this.Music.play()
                switch (item.speciality) {
                    case "IncreaseBoost":
                        this.game.boostLength = this.game.maxBooster
                        break;
                    case "IncreaseLife":
                        if (this.game.lives <= this.game.maxLives) {
                            this.game.lives += 1
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        )


    }
}