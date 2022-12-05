import Game from "./game.js";
export default class InputHandler {
    constructor(game) {
        this.keys = [];
        this.audio = new Audio();
        this.game = game;
        window.onkeydown = (e) => {
            if (e.key == "f" || e.key == "F") {
                const container = document.getElementById("container");
                if (!document.fullscreenElement) {
                    container === null || container === void 0 ? void 0 : container.requestFullscreen().catch((err) => {
                        alert("Error");
                    });
                }
                else {
                    document.exitFullscreen();
                }
            }
            if ((e.key ==
                "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == " ") && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
                if (e.key == " ") {
                    this.audio.src = "../assets/musics/fireUp.wav";
                    this.audio.play();
                }
            }
            else if (e.key === "d")
                this.game.debug = !this.game.debug;
        };
        window.onkeyup = (e) => {
            if ((e.key ==
                "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == " ") && this.keys.indexOf(e.key) !== -1) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        };
    }
}
