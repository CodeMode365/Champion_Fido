import Game from "./game.js";
window.onload = (e: Event) => {
    const canvas: HTMLCanvasElement = document.getElementById("canvas1")
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    canvas.height = 500;
    canvas.width = 900;

    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0
    let audio: HTMLAudioElement = new Audio()
    audio.src = "../assets/musics/90sLove.mp3"
    audio.muted = true
    if (e) {
        audio.muted = false
    }


    //animatig function
    function animate(timeStamp: number) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime)
        if (!game.gameOver) {
            requestAnimationFrame(animate)
            audio.play()
        } else {
            audio.src = "../assets/musics/Over.mp3"
            audio.play()
        }

        game.draw(ctx)
    }
    animate(0)

    //to restart game
    window.addEventListener('keypress', (e: KeyboardEvent) => {
        if ((e.key == "Enter" || e.key == "enter") && game.gameOver) {
            audio.src = "../assets/musics/90sLove.mp3"
            game.initGame()
            animate(0)
        }

    })

}