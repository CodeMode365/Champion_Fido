


//main canavs
const canvaS: HTMLCanvasElement = document.getElementById("shootGame")
const ctxS: CanvasRenderingContext2D = canvaS.getContext("2d")

canvaS.width = window.innerWidth
canvaS.height = window.innerHeight

//canvas for detecting collition
const collisionCanvas: HTMLCanvasElement = document.getElementById("collisionCanvas")
const collisionCTX: CanvasRenderingContext2D = collisionCanvas.getContext("2d")

collisionCanvas.width = window.innerWidth
collisionCanvas.height = window.innerHeight

const music = new Audio()
music.src = "../assets/sounds/music.mp3"

function playMusic(): void {
    music.play()
    music.onended = () => {
        playMusic()
    }
}

//reavens
let timeToNextRaven: number = 0
const ravenIntarval: number = 500
let lastTime: number = 0
let score = 0
let gameOver: boolean = false
let overCount: number = 0
//all explosives
let explozers: Explosion[] = []
let highScore: number;
//setLocal storage value for hight score
if (localStorage.getItem("highScore")) {
    // console.log(localStorage.getItem('highScore'))
    highScore = parseInt(localStorage.getItem("highScore"))

} else {
    localStorage.setItem("highScore", "0")
    highScore = 0
}

class Explosion {
    //setting up explosives value
    private spriteHeight = 179
    private spriteWidth = 200
    private explodeImage: HTMLImageElement = new Image()
    private explodeEffect: HTMLAudioElement = new Audio()
    private x: number
    private y: number
    private size: number
    private frame = 0
    private timeSinceLastFrame = 0
    private frameInterval = 100
    public markedForDeletion = false
    constructor(x: number, y: number, size: number) {
        this.x = x
        this.y = y
        this.explodeImage.src = "../assets/boom.png"
        this.explodeEffect.src = "../assets/sounds/gun.mp3"
        this.size = size
    }
    public update(deltaTime: number): void {
        if (this.frame === 0) this.explodeEffect.play()
        this.timeSinceLastFrame += deltaTime

        //increaing the frame picture slowly
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++
            this.timeSinceLastFrame = 0
            if (this.frame > 5) { this.markedForDeletion = true }
        }

    }
    public draw(): void {
        ctxS.drawImage(this.explodeImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size / 4, this.size, this.size)
    }
}

//ravens
let ravens: Raven[] = []
class Raven {
    readonly width: number
    private height: number
    public x: number
    public y: number
    private directionX: number
    private directionY: number
    private creatureImage: HTMLImageElement = new Image()
    private spriteHeight: number
    private spriteWidth: number
    private sizeModifier: number
    private frame: number = 0
    private maxFrame: number = 4
    private timeSinceFlap: number
    private flapInterval: number
    readonly randmColor: number[]
    private GenColor: string
    public markedForDeletion: boolean
    private hasTrail: boolean
    constructor() {
        this.sizeModifier = Math.random() * 0.6 + 0.5
        this.spriteWidth = 271
        this.spriteHeight = 194
        this.width = this.spriteWidth / 2 * this.sizeModifier
        this.height = this.spriteHeight / 2 * this.sizeModifier
        this.x = canvaS.width
        this.y = Math.random() * (canvaS.height - this.height)
        this.directionX = Math.random() * 5 + 3
        this.directionY = Math.random() * 5 - 2.5
        this.markedForDeletion = false
        this.creatureImage.src = "../assets/raven.png"
        this.timeSinceFlap = 0
        this.flapInterval = Math.random() * 50 + 50
        this.randmColor = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
        this.GenColor = `rgba(${this.randmColor[0]},${this.randmColor[1]},${this.randmColor[2]})`
        this.hasTrail = Math.random() < .25
    }
    public update(deltaTime: number): void {
        this.x -= this.directionX
        this.y += this.directionY

        if (this.y < 0 || this.y > canvaS.height - this.height) {
            this.directionY = this.directionY * -1
        }
        this.timeSinceFlap += deltaTime;
        if (this.timeSinceFlap > this.flapInterval) {
            //to load flapping frame
            if (this.frame > this.maxFrame) {
                this.frame = 0
            } else {
                this.frame++
            }
            this.timeSinceFlap = 0
            if (this.hasTrail) {
                if (score > 40) {
                    particles.push(new Particle(this.x, this.y, this.width, this.GenColor))
                }
            }
        }
        //to remove the raven that passed screen
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true
        }
        if (this.x < 0 - this.width) gameOver = true
    }
    //draw the raven
    public draw(): void {
        collisionCTX.fillStyle = this.GenColor
        collisionCTX.fillRect(this.x, this.y, this.width, this.height)
        ctxS.drawImage(this.creatureImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }

}


//particel class
let particles: Particle[] = []


class Particle {
    private x: number
    private y: number
    private radius: number
    private speedX: number
    private maxRadius: number
    private size: number
    private color: string
    public markedTodeletion: boolean
    // private radius: number
    constructor(x: number, y: number, size: number, color: string) {
        this.size = size
        this.x = x + this.size / 2 + Math.random() * 50 - 25
        this.y = y + this.size / 3 + Math.random() * 50 - 25
        this.radius = Math.random() * this.size / 10
        this.maxRadius = Math.random() * 20 + 35
        this.speedX = Math.random() * 1 + 0.5
        this.color = color
        this.markedTodeletion = false
        // this.radius
    }
    public update(): void {
        this.x += this.speedX
        this.radius += Math.random() * 0.5
        if (this.radius > this.maxRadius - 5) this.markedTodeletion = true
    }
    public draw(): void {
        ctxS.save()
        ctxS.globalAlpha = 1 - this.radius / this.maxRadius
        ctxS.beginPath()
        ctxS.fillStyle = this.color
        ctxS.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctxS.fill()
        ctxS.restore()
    }
}

//scoring
function drawScore(): void {
    // ctxS.font = "30px Arial"
    ctxS.font = "50px Impact"
    ctxS.fillStyle = "black";
    ctxS.fillText("Score: " + score, 50, 75)
    ctxS.fillStyle = "white"
    ctxS.fillText("Score: " + score, 52, 76)
    ctxS.fillText("Score: " + score, 53, 76)
    ctxS.fillStyle = "black"
    ctxS.fillText("Score: " + score, 54, 76)
    ctxS.fillStyle = "black"
    ctxS.font = "30px Impact"

    ctxS.fillText("Hight Score: " + highScore, 54, 136)
}


//gameOVer function
function GAME_OVER(): void {
    ctxS.textAlign = "center"
    ctxS.font = "80px Impact"
    ctxS.fillStyle = "black"
    ctxS.fillText("GAME OVER", canvaS.width / 2 - 4, canvaS.height / 2 - 4)
    ctxS.fillStyle = "white"
    ctxS.fillText("GAME OVER", canvaS.width / 2 - 2, canvaS.height / 2 - 2)
    ctxS.fillStyle = "rgb(230,120,60)"
    ctxS.fillText("GAME OVER", canvaS.width / 2, canvaS.height / 2)
    ctxS.fillStyle = "black"
    ctxS.fillText("Your Score is: " + score, canvaS.width / 2 - 4, canvaS.height / 2 + 80 - 4)
    ctxS.fillStyle = "white"
    ctxS.fillText("Your Score is: " + score, canvaS.width / 2 - 2, canvaS.height / 2 + 80 - 2)
    ctxS.fillStyle = "rgb(64,134,74)"
    ctxS.fillText("Your Score is: " + score, canvaS.width / 2, canvaS.height / 2 + 80)
    if (score >= highScore) {
        localStorage.setItem("highScore", score.toLocaleString())

    }
    overCount++
    if (overCount <= 1) {
        music.src = "../assets/sounds/end.mp3"
        music.play()
        music.onended = () => {
            music.src = ""
        }
    }
}

//clicking event
window.addEventListener("click", (e: MouseEvent) => {
    playMusic()
    const deltectPixelColor = collisionCTX.getImageData(e.x, e.y, 1, 1)
    //to hold pixels color
    const pc = deltectPixelColor.data

    ravens.forEach((raven: Raven): void => {
        if (raven.randmColor[0] == Math.floor(pc[0]) && raven.randmColor[1] == Math.floor(pc[1]) && raven.randmColor[2] == Math.floor(pc[2])) {
            raven.markedForDeletion = true
            score++
            explozers.push(new Explosion(raven.x, raven.y, raven.width))
        }
    })
    if (score > highScore) highScore = score
})

//to run the animation
function animate(timestamep: number): void {
    ctxS.clearRect(0, 0, canvaS.width, canvaS.height)
    collisionCTX.clearRect(0, 0, canvaS.width, canvaS.height)
    const deltaTime = timestamep - lastTime
    lastTime = timestamep
    timeToNextRaven += deltaTime
    drawScore()
    if (timeToNextRaven > ravenIntarval) {

        ravens.push(new Raven())
        timeToNextRaven = 0
        const newRav = new Raven()
        ravens.sort(function (a, b) {
            return a.width - b.width;
        })
    }

    [...particles, ...ravens, ...explozers].forEach((object: (Raven | Explosion | Particle)): void => {
        object.update(deltaTime)
    });
    [...particles, ...ravens, ...explozers].forEach((object: (Raven | Explosion | Particle)): void => {
        object.draw()
    });

    ravens = ravens.filter((raven: Raven) => !raven.markedForDeletion)
    explozers = explozers.filter((explozer: Explosion) => !explozer.markedForDeletion)
    particles = particles.filter((particle: Particle) => !particle.markedTodeletion)
    if (!gameOver) requestAnimationFrame(animate)
    if (gameOver) GAME_OVER()
}

animate(0)
