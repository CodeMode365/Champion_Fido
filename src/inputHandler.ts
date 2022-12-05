import Game from "./game.js"

export default class InputHandler {
    readonly keys: string[] = []
    private game: Game

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
                    document.exitFullscreen()
                }

            }
            if ((e.key ==
                "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == " ") && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key)
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