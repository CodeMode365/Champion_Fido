import Game from "./game.js";
window.onload = () => {
    const canvas: HTMLCanvasElement = document.getElementById("canvas1")
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    canvas.height = 500;
    canvas.width = 500;

    const replay: HTMLButtonElement = document.getElementById("Replay")

    const game = new Game(canvas.width, canvas.height)


    let lastTime = 0
    function animate(timeStamp: number) {
        console.log("hello")
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime)
        if (!game.gameOver) { requestAnimationFrame(animate) }
        game.draw(ctx)
    }
    animate(0)
}