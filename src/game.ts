import Player from "./player.js"
import InputHandler from "./inputHandler.js"
import { Background } from "./background.js"
import { FlyEnemy, GroundEnemy, ClimbingEnemy, Enemy } from "./Enemy.js"
import { UI } from "./UI.js"
import { Dust, Particle } from "./Particles.js"
import { collisionAnimation } from "./collisionAnimation.js"
import { FloatingMsg } from "./floatingMsg.js"
import { Items, Boost, Life } from "./Items.js"

export default class Game {
    public player: Player
    readonly width: number
    readonly height: number
    private input: InputHandler
    public groundMarin: number
    public speed = 0
    private background: Background
    public maxSpeed = 6
    public score = 0
    public particles: Particle[] = []
    public collisions: collisionAnimation[] = []
    private maxParticles = 70
    public playerLives = new Image()
    public lives = 5
    public floatingMessage: FloatingMsg[] = []
    public targetScore = 40
    public items !: Items
    //enemy control
    public enemies: Enemy[] = []
    private enemyTimer = 0
    private enemyInterval = 3000
    public debug = false
    public fontColor = "black"
    private UI: UI

    //gaming variables
    public maxTime = 30000
    public time = 0
    public gameOver = false

    //booster rectangle variable
    private boostX: number
    private boostY: number
    public boostLength: number = 200
    private boostHeight: number = 25
    private boostImg = new Image()
    public maxBooster = 200


    constructor(width: number, height: number) {
        this.groundMarin = 80
        this.width = width
        this.height = height
        this.input = new InputHandler(this)
        this.player = new Player(this)
        this.background = new Background(this)
        this.UI = new UI(this)
        this.player.currentState = this.player.states[0]
        this.player.currentState?.enter()
        this.boostX = this.width - this.boostLength * 1.4
        this.boostY = 30
        this.boostImg.src = "../assets/others/flame.png"
    }
    update(deltaTime: number) {
        this.time += deltaTime
        //gameOVer count
        if (this.time > this.maxTime) this.gameOver = true

        this.background.update()
        this.player.update(this.input.keys, deltaTime)
        //handle enemies
        if (this.enemyTimer > this.enemyInterval) {
            this.addEnemy();
            this.enemyTimer = 0
        } else {
            this.enemyTimer += deltaTime
        }
        this.addItems()

        this.enemies?.forEach((enemy: Enemy) => {
            enemy.update(deltaTime)
        })
        this.enemies = this.enemies.filter((enemy: Enemy) => !enemy.markedFordDeletion)

        if (this.items) {

            this.items.update()
        }

        //handle particles
        this.particles.forEach((particle: Particle, index: number) => {
            particle.update()
            if (particle.markedForDeletion) this.particles.splice(index, 1)
        })

        if (this.particles.length > this.maxParticles) {
            this.particles.length = this.maxParticles
        }
        //handle collision animation
        this.collisions.forEach((collision: collisionAnimation, index: number) => {
            collision.update(deltaTime);
            if (collision.markedForDeletion) this.collisions.splice(index, 1)
        })

        //update increasing score
        this.floatingMessage.forEach((message: FloatingMsg, index: number) => {
            message.update();
        })
        this.floatingMessage = this.floatingMessage.filter((message: FloatingMsg) =>
            !message.markedForDeletion)
    }
    draw(ctx: CanvasRenderingContext2D) {
        //draw background
        this.background.draw(ctx)
        //draw particles
        this.particles.forEach((particle: Particle, index: number) => {
            particle.draw(ctx)
        })
        //drawing the booster info layer
        ctx.drawImage(this.boostImg, this.boostX - 30, this.boostY, 30, 25)
        ctx.save()
        ctx.fillStyle = "rgba(255,50,50,0.9)"
        ctx.fillRect(this.boostX, this.boostY, this.boostLength, this.boostHeight)
        ctx.strokeRect(this.boostX, this.boostY, this.boostLength, this.boostHeight)
        ctx.restore()


        //draw palyer
        this.player.draw(ctx)

        //draw enemies
        this.enemies?.forEach((enemy: Enemy) => {
            enemy.draw(ctx)
        })
        //draw the collision animation
        this.collisions.forEach((collision: collisionAnimation, index: number) => {
            collision.draw(ctx)
        })

        //draw increains score
        this.floatingMessage.forEach((message: FloatingMsg) => {
            message.draw(ctx);
        })

        if (this.items) {
            this.items.draw(ctx)
        }

        this.UI.draw(ctx)
        this.UI.draw(ctx)

    }
    addEnemy() {
        if (
            (this.speed > 0) && (Math.random() > 0.5)
        ) this.enemies.push(new GroundEnemy(this))
        else if (
            this.speed > 0
        ) this.enemies.push(new ClimbingEnemy(this))
        this.enemies.push(new FlyEnemy(this))
    }
    addItems() {
        if (this.score === 1) {
            this.items = new Life(this)
        }
    }
}