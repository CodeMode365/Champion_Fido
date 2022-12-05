import Game from "./game.js";
window.onload = () => {
    const canvas: HTMLCanvasElement = document.getElementById("canvas1")
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    canvas.height = 500;
    canvas.width = 900;

    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0
    let audio: HTMLAudioElement = new Audio()
    audio.src = "../assets/musics/90sLove.mp3"
    console.log(audio)

    function animate(timeStamp: number) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime)
        if (!game.gameOver) {
            requestAnimationFrame(animate)
            audio.play()
        }else{
            audio.src="../assets/musics/Over.mp3"
            audio.play()
        }

        game.draw(ctx)
    }
    animate(0)
}