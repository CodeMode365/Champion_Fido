export default class InputHandler {
    constructor() {
        window.onkeydown = (e) => {
            console.log(e.key);
        };
    }
}
