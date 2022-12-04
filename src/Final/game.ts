import Player from "./player.js"
import InputHandler from "./inputHandler.js"
import { Background } from "./background.js"
import { FlyEnemy, GroundEnemy, ClimbingEnemy, Enemy } from "./Enemy.js"
import { UI } from "./UI.js"
import { Sitting, Running, Jumping, Falling, Rolling, State } from "./playerState.js";
import { Dust, Particle } from "./Particles.js"


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

    //enemy control
    readonly enemies: Enemy[] = []
    private enemyTimer = 0
    private enemyInterval = 1000
    public debug = true
    public fontColor = "black"
    private UI: UI

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
            if (enemy.markedFordDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1)
        })

        //handle particles
        this.particles.forEach((particle: Particle, index: number) => {
            particle.update()
            if (particle.markedForDeletion) this.particles.splice(index, 1)
        })

        if (this.particles.length > 70) {
            this.particles = this.particles.slice(0, 70)
        }
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