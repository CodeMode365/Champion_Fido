import Player from "./Player.js"
import InputHandler from "./input.js"
import { drawStatusText } from "./utils.js"

window.addEventListener('load', () => {

    const loading: HTMLHeadingElement = document.getElementById("loading")
    loading.style.display = "none"
    const canvas: HTMLCanvasElement = document.getElementById("canvas1")
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const player = new Player(canvas.width, canvas.height)

    const input = new InputHandler()


    let lastTime = 0;

    //animation looping
    function animate(timeStamp: number) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        player.draw(ctx, deltaTime)
        player.update(input.lastKey)
        drawStatusText(ctx, input, player)
        requestAnimationFrame(animate)
        // console.log(input)
    }
    animate(0)
})