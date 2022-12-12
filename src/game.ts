import Player from "./player.js"
import InputHandler from "./inputHandler.js"
import { Background } from "./background.js"
import { FlyEnemy, GroundEnemy, ClimbingEnemy, MonsterBat, Zombies, Enemy } from "./Enemy.js"
import { UI } from "./UI.js"
import { Dust, Particle } from "./Particles.js"
import { collisionAnimation } from "./collisionAnimation.js"
import { FloatingMsg } from "./floatingMsg.js"
import { Items, Boost, Heart } from "./Items.js"
import { TeamDog } from "./HelperDog.js"
export default class Game {
    public player: Player
    readonly width: number
    readonly height: number
    private input: InputHandler
    public groundMarin: number
    public speed = 0
    private background: Background
    public maxSpeed = 6
    public coins = 0
    public particles: Particle[] = []
    public collisions: collisionAnimation[] = []
    private maxParticles = 70
    public Teams !: TeamDog | null
    //lives
    public playerLives = new Image()
    readonly maxLives = 10
    public lives = 5
    public floatingMessage: FloatingMsg[] = []
    // public targetScore = 40
    public items: (Boost | Heart)[] = []
    //enemy control
    public enemies: Enemy[] = []
    private enemyTimer = 0
    private enemyInterval = 3000
    public debug = false
    public fontColor = "black"
    private UI: UI

    //gaming variables
    // public maxTime = Infinity
    // public time = 0
    public gameOver = false

    //booster rectangle variable
    private boostX: number
    private boostY: number
    public boostLength: number = 200
    private boostHeight: number = 25
    private boostImg = new Image()
    public maxBooster = 200
    public highScore = 0
    public boostDecreaser = 0.2
    public distanceTraveled = 0
    private checkPointForHeart: number[] = [7]
    private boosterCurrentPoint !: number
    private checkPointForBooster: number[] = [10]
    private heartCurrentPoint !: number


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
        //setLocal storage value for hight score

        for (let i = 1; i <= 30; i++) {
            this.checkPointForBooster[i] = this.checkPointForBooster[i - 1] + i * 4
            this.checkPointForHeart[i] = this.checkPointForHeart[i - 1] + i * 4
        }
        this.boosterCurrentPoint = this.checkPointForHeart[0]
        this.heartCurrentPoint = this.checkPointForBooster[0]
        console.log(this.boosterCurrentPoint)
        console.log(this.checkPointForBooster)
        console.log(this.checkPointForHeart)

    }
    update(deltaTime: number) {
        if (localStorage.getItem("highScore")) {
            this.highScore = parseInt(localStorage.getItem("highScore"))

        } else {
            localStorage.setItem("highScore", "0")
            this.highScore = this.distanceTraveled
        }

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

        //handling the items
        this.addItems()
        this.items.forEach((item: Items) => {
            item.update()
        })
        this.items = this.items.filter((item: Items) =>
            !item.markedForDeletion)

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

        this.Teams?.update(deltaTime)
        if (this.Teams?.markedFordDeletion) {
            this.Teams = null
        }

        //increase the socre
        this.distanceTraveled += this.speed / 1000
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
        ctx.strokeRect(this.boostX, this.boostY, this.maxBooster, this.boostHeight)
        ctx.restore()


        //draw palyer
        this.player.draw(ctx)

        //draw enemies
        this.enemies?.forEach((enemy: Enemy) => {
            enemy.draw(ctx)
        })

        //draw the team dog
        this.Teams?.draw(ctx)

        //draw the collision animation
        this.collisions.forEach((collision: collisionAnimation, index: number) => {
            collision.draw(ctx)
        })

        //draw increains score
        this.floatingMessage.forEach((message: FloatingMsg) => {
            message.draw(ctx);
        })

        this.items.forEach((item: Items) => {
            item.draw(ctx)
        })

        this.UI.draw(ctx)
        this.UI.draw(ctx)

    }
    addEnemy() {
        if (
            (this.speed > 0) && (Math.random() > 0.5)
        ) {
            this.enemies.push(new GroundEnemy(this))
            if (Math.random() > 0.5) {
                this.enemies.push(new MonsterBat(this))
            }
        }
        else if (
            this.speed > 0
        ) this.enemies.push(new ClimbingEnemy(this))
        this.enemies.push(new FlyEnemy(this))
        if (this.distanceTraveled > 5 && (Math.random() * 2 < .5)) {
            this.enemies.push(new Zombies(this))
        }
    }
    addItems() {
        const travel = Math.round(this.distanceTraveled)

        if (travel > 0 && (travel % this.boosterCurrentPoint == 0) && (this.items.length == 0)) {
            // this.distanceTraveled += 1
            this.items.push(new Boost(this))
            this.boosterCurrentPoint = this.checkPointForBooster[this.checkPointForBooster.indexOf(this.boosterCurrentPoint) + 1]
        }
        else if (travel > 0 && (travel % this.heartCurrentPoint == 0) && (this.items.length == 0)) {
            // this.distanceTraveled += +
            this.items.push(new Heart(this))

            this.heartCurrentPoint = this.checkPointForHeart[this.checkPointForHeart.indexOf(this.heartCurrentPoint) + 1]

        }

    }

}