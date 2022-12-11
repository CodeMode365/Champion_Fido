import Game from "./game.js"

export default class InputHandler {
    readonly keys: string[] = []
    private game: Game
    private audio: HTMLAudioElement = new Audio()

    constructor(game: Game) {
        this.game = game

        window.onkeydown = (e: KeyboardEvent) => {
            if (e.key == "f" || e.key == "F") {
                const container = document.getElementById("container")
                if (!document.fullscreenElement) {
                    container?.requestFullscreen().catch((err: Error) => {
                        alert("Error")
                    })
                } else {
                    this.audio.src=""
                    document.exitFullscreen()
                }

            }
            // if(e.key =="H" || e.key="h"){
            //     this.game.Teams.push(new(this.game.del))
            // }
            if ((e.key == "A" || e.key == "a") && this.game.coins) {
                this.game.lives++
                this.audio.src = "../assets/musics/getItem.wav"
                this.audio.play()
                this.game.coins -= 15
            }
            if ((e.key == "S" || e.key == "s") && this.game.coins) {
                this.game.boostLength = this.game.maxBooster
                this.audio.src = "../assets/musics/getItem.wav"
                this.audio.play()
                this.game.coins -= 20
            }


            if ((e.key ==
                "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == " ") && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key)
                if (e.key == " ") {
                    this.audio.src = "../assets/musics/fireUp.wav"
                    this.audio.play()
                }
            } else if (e.key === "d") this.game.debug = !this.game.debug
        }
        window.onkeyup = (e: KeyboardEvent) => {
            if ((e.key ==
                "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == " ") && this.keys.indexOf(e.key) !== -1) {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
        }
    }

}