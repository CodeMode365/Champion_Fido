const canvas = document.getElementById("canvas1")
const ctx = canvas?.getContext("2d")

const dropDown = document.getElementById("animations")
dropDown?.addEventListener("change", (e: any): void => {
    playerState = e.target.value
})

const CANVAS_WIDTH: number = canvas.width = 600;
const CANVAS_HEIGHT: number = canvas.height = 600

//image
const playerImage: HTMLImageElement = new Image()
playerImage.src = "../assets/shadow_dog.png"
//single cartoon data
const spriteWidth: number = 575
const spriteHeight: number = 523
let playerState: string = "getHit"
//frame rates
let frameX: number = 0
let frameY: number = 4
//game framing variable
let gameFrame: number = 0
let staggerFrames: number = 5

//Animation Data variables
interface animationModal {
    readonly name: string
    frames: number
}
interface frameModal {
    loc: { x: number, y: number }[]
}
interface spriteAnimationModal {
    " ": []
}
const spriteAnimation: spriteAnimationModal[] = [];
const animationState: animationModal[] = [
    { name: "idle", frames: 7 },
    { name: "jump", frames: 7 },
    { name: "fall", frames: 7 },
    { name: "run", frames: 9 },
    { name: "dizzy", frames: 11 },
    { name: "sit", frames: 5 },
    { name: "roll", frames: 7 },
    { name: "bite", frames: 7 },
    { name: "ko", frames: 12 },
    { name: "getHit", frames: 4 },
]

//logic to get the cordinates of each framing image
animationState.forEach((state: animationModal, index: number): void => {
    let frames: frameModal = {
        loc: []
    }
    for (let j: number = 0; j < state.frames; j++) {
        let positionX: number = j * spriteWidth
        let positionY: number = index * spriteHeight
        frames.loc.push({ x: positionX, y: positionY })
    }
    spriteAnimation[state.name] = frames
})

function animate(): void {
    ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let position: number = Math.floor(gameFrame / staggerFrames) % spriteAnimation[playerState].loc.length;

    let frameX = spriteWidth * position
    let frameY = spriteAnimation[playerState].loc[position].y;
    //ctx 1arg=image, 4args=Crop Area, 4args= Cropped pic position
    ctx?.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, -40, CANVAS_WIDTH, CANVAS_HEIGHT)

    //TO slow down the animation rate
    if (gameFrame % staggerFrames == 0)
        frameX < 6 ? frameX++ : frameX = 0
    gameFrame++
    requestAnimationFrame(animate)
}
animate()


