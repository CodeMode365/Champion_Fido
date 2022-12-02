export default class InputHandler {
    readonly keys: string[] = []

    constructor() {

        window.onkeydown = (e: KeyboardEvent) => {
            if ((e.key ==
                "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight") && this.keys.indexOf(e.key)) {
                this.keys.push(e.key)
            }
        }
        window.onkeyup = (e: KeyboardEvent) => {
            if (e.key ==
                "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
        }
    }

}