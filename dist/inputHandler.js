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
                    this.audio.src = "";
                    document.exitFullscreen();
                }
            }
            if ((e.key == "A" || e.key == "a") && (this.game.coins >= 15) && (this.game.lives < this.game.maxLives)) {
                this.game.lives++;
                this.audio.src = "../assets/musics/getItem.wav";
                this.audio.play();
                this.game.coins -= 15;
            }
            else if ((e.key == "A" || e.key == "a") && (this.game.coins >= 15 || this.game.lives < this.game.maxLives)) {
                this.audio.src = "../assets/musics/error.wav";
                this.audio.play();
            }
            if ((e.key == "S" || e.key == "s") && (this.game.coins >= 20) && (this.game.boostLength < this.game.maxBooster)) {
                this.game.boostLength = this.game.maxBooster;
                this.audio.src = "../assets/musics/getItem.wav";
                this.audio.play();
                this.game.coins -= 20;
            }
            else if ((e.key == "S" || e.key == "s") && (this.game.coins >= 20 || this.game.boostLength < this.game.maxBooster)) {
                this.audio.src = "../assets/musics/error.wav";
                this.audio.play();
            }
            if (this.game.gameOver && (e.key == "R" || e.key == "r")) {
                this.game.enemies = [];
                this.game.collisions = [];
                this.game.coins = 0;
                this.game.player.x = 0 + this.game.player.width;
                this.game.player.currentState = this.game.player.states[0];
                this.game.particles = [];
                this.game.gameOver = false;
                console.log('restart');
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
