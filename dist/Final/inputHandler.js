export default class InputHandler {
    constructor() {
        this.keys = [];
        window.onkeydown = (e) => {
            if ((e.key ==
                "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight") && this.keys.indexOf(e.key)) {
                this.keys.push(e.key);
            }
        };
        window.onkeyup = (e) => {
            if (e.key ==
                "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        };
    }
}
