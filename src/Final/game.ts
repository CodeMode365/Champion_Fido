import Player from "./player.js"
import InputHandler from "./inputHandler.js"
import { Background } from "./background.js"
import { FlyEnemy, GroundEnemy, ClimbingEnemy, Enemy } from "./Enemy.js"

export default class Game {
    private player: Player
    readonly width: number
    readonly height: number
    private input: InputHandler
    public groundMarin: number
    public speed = 0
    private background: Background
    public maxSpeed = 6
    //enemy control
    private enemies: Enemy[] = []
    private enemyTimer = 0
    private enemyInterval = 1000


    constructor(width: number, height: number) {
        this.groundMarin = 80
        this.width = width
        this.height = height
        this.input = new InputHandler()
        this.player = new Player(this)
        this.background = new Background(this)
    }
    update(deltaTime: number) {
        this.background.update()
        this.player.update(this.input.keys, deltaTime)
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
        // console.log(this.enemies)
    }
    draw(ctx: CanvasRenderingContext2D) {

        this.background.draw(ctx)
        this.player.draw(ctx)
        this.enemies?.forEach((enemy: Enemy) => {
            enemy.draw(ctx)
        })

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