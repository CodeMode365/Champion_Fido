export default class InputHandler {
    private keys !: string[]

    constructor(){

        window.onkeydown=(e:KeyboardEvent)=>{
            console.log(e.key)
        }
    }

}