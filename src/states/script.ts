import Player from "./Player.js"

window.addEventListener('load', () => {

    const loading: HTMLHeadElement = document.getElementById("loading")
    loading.style.display = "none"
    const canvas: HTMLCanvasElement = document.getElementById("canvas1")
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const player = new Player(canvas.width, canvas.height)
})