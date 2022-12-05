import Player from "./player.js"
import InputHandler from "./inputHandler.js"
import { Background } from "./background.js"
import { FlyEnemy, GroundEnemy, ClimbingEnemy, Enemy } from "./Enemy.js"
import { UI } from "./UI.js"
import { Sitting, Running, Jumping, Falling, Rolling, State } from "./playerState.js";
import { Dust, Particle } from "./Particles.js"
import { collisionAnimation } from "./collisionAnimation.js"
import { FloatingMsg } from "./floatingMsg.js"

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
    public targetScore=40

    //enemy control
    public enemies: Enemy[] = []
    private enemyTimer = 0
    private enemyInterval = 1000
    public debug = true
    public fontColor = "black"
    private UI: UI

    //gaming variables
    public maxTime = 30000
    public time = 0
    public gameOver = false


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

        this.enemies?.forEach((enemy: Enemy) => {
            enemy.update(deltaTime)
        })
        this.enemies = this.enemies.filter((enemy: Enemy) => !enemy.markedFordDeletion)

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

              console.log(this.particles)
            console.log(this.enemies)
            console.log(this.collisions)
            console.log(this.floatingMessage)
    }
    draw(ctx: CanvasRenderingContext2D) {
        //draw background
        this.background.draw(ctx)
        //draw particles
        this.particles.forEach((particle: Particle, index: number) => {
            particle.draw(ctx)
        })
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
}