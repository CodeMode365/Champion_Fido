// import Player from "./player.js";
// import InputHandler from "./inputHandler.js";
import Game from "./game.js";
window.onload = () => {
    const canvas: HTMLCanvasElement = document.getElementById("canvas1")
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    canvas.height = 500;
    canvas.width = 500;


    const game = new Game(canvas.width, canvas.height)

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.draw(ctx)
        game.update()
        requestAnimationFrame(animate)
    }
    animate()
}