import Game from "./game.js";
export default class InputHandler {
    constructor(game) {
        this.keys = [];
        this.game = game;
        window.onkeydown = (e) => {
            if ((e.key ==
                "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "Enter") && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
            else if (e.key === "d")
                this.game.debug = !this.game.debug;
        };
        window.onkeyup = (e) => {
            if ((e.key ==
                "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "Enter") && this.keys.indexOf(e.key) !== -1) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        };
    }
}
