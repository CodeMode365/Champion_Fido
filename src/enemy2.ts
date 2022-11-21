window.onload = () => {

    const CVX: HTMLCanvasElement = document.getElementById("canvasEnemy")
    const contX: CanvasRenderingContext2D = CVX.getContext("2d")

    CVX.width = 500
    CVX.height = 500


    //gaming object class
    class Game {
        private context: CanvasRenderingContext2D
        readonly width: number
        readonly height: number
        readonly enemyInterval: number = 500
        private enemyTimer: number = 0
        //array to hold auto generatd new ememies
        private enemies: Enemy[] = []
        private enemyTypes = ["worm", "ghost", "spider"]
        constructor(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
            this.context = ctx
            this.width = canvasWidth
            this.height = canvasHeight
            this.#addNewEnemy()
        }

        update(deltaTime: number) {
            deltaTime = deltaTime ? deltaTime : 0
            if (this.enemyTimer > this.enemyInterval) {
                this.#addNewEnemy()
                this.enemyTimer = 0
            }
            else {
                this.enemyTimer += deltaTime ? deltaTime : 0
            }
            this.enemies.forEach((object: Enemy) => {
                object.update(deltaTime)
            })
            this.enemies = this.enemies.filter((enemy: Enemy) => !enemy.markedForDeletion)
        }
        draw() {

            this.enemies.forEach((object: Enemy) => {
                object.draw(this.context)
            })
        }
        //function that runs always when creating new enemy
        #addNewEnemy() {
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)]
            if (randomEnemy == "ghost") this.enemies.push(new Ghost(this))
            else if (randomEnemy == "worm") this.enemies.push(new Worm(this))
            else if (randomEnemy == "spider") this.enemies.push(new Spider(this))
            this.enemies.sort((a, b) => {
                return a.y - b.y
            })
        }
    }



    //enemies
    class Enemy {
        x: number
        y: number
        protected height: number
        protected weidth: number
        private game: Game
        protected spriteWidth: number = 229
        protected spriteHeight: number = 171
        protected image: HTMLImageElement = new Image()
        public markedForDeletion: boolean
        protected speed = Math.random() * 2 + 0.1
        protected vX = Math.random() * .25
        protected vY = .25
        protected frameX = 0
        protected maxFrame = 5
        private framInterval = 100
        private frameTimer = 0
        constructor(game: Game) {
            this.game = game
            this.height = 100
            this.weidth = 100
            this.x = this.game.width
            this.y = Math.random() * this.game.height
            this.markedForDeletion = false
        }
        update(deltaTime: number) {
            this.x -= this.vX * deltaTime
            //make the enemy ready for deletion
            if (this.x < 0 - this.weidth) { this.markedForDeletion = true }
            if (this.frameTimer > this.framInterval) {
                if (this.frameX < this.maxFrame) this.frameX++
                else this.frameX = 0
                this.frameTimer = 0
            } else {
                this.frameTimer += deltaTime
            }
        }
        draw(ctx: CanvasRenderingContext2D) {

            ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.weidth, this.height)
        }
    }

    //WOrm enemy
    class Worm extends Enemy {

        constructor(game: Game) {
            super(game)
            this.spriteWidth = 229
            this.spriteHeight = 171
            this.height = this.spriteHeight / 2.5
            this.weidth = this.spriteWidth / 2
            this.x = game.width
            // this.y = Math.random() * game.height
            this.y = game.height - this.height
            this.image.src = "../assets/enemy_worm.png"

        }
    }
    class Ghost extends Enemy {
        private opacity = Math.random() * .6 + 0.2
        private angle = 0
        private curve = Math.random() * 1.5
        constructor(game: Game) {
            super(game)
            this.spriteWidth = 261
            this.spriteHeight = 209
            this.height = this.spriteHeight / 2.5
            this.weidth = this.spriteWidth / 2
            this.x = game.width
            // this.y = Math.random() * game.height
            this.y = Math.random() * game.height - (this.height)
            this.image.src = "../assets/enemy_ghost.png"
        }
        update(deltaTime: number): void {
            super.update(deltaTime)
            this.y += Math.sin(this.angle) * this.curve
            this.angle += 0.02

        }
        draw(ctx: CanvasRenderingContext2D): void {
            ctx.save()
            ctx.globalAlpha = this.opacity
            super.draw(ctx)
            ctx.restore()
        }
    }
    class Spider extends Enemy {
        private opacity = Math.random() * .6 + 0.2
        private maxLength: number
        constructor(game: Game) {
            super(game)
            this.spriteWidth = 310
            this.spriteHeight = 175
            this.height = this.spriteHeight / 2.5
            this.weidth = this.spriteWidth / 2
            this.x = Math.random() * game.width
            this.y = 0 - this.height
            this.vX = 0
            this.vY = 1
            this.image.src = "../assets/enemy_spider.png"
            this.maxLength = Math.random() * game.height - this.height
        }
        update(deltaTime: number): void {
            super.update(deltaTime)
            this.y += this.vY
            if (this.y > this.maxLength) this.vY *= -1
            if (this.y < 0 - this.height * 2) this.markedForDeletion = true
        }
        draw(ctx: CanvasRenderingContext2D): void {
            ctx.beginPath()
            ctx.moveTo(this.x + this.weidth / 2, 0)
            ctx.lineTo(this.x + this.weidth / 2, this.y + this.height / 2)
            ctx.stroke()
            super.draw(ctx)

        }

    }

    //creat object of Game class
    const game = new Game(contX, CVX.width, CVX.height)


    //last timestamp
    let lastTime: number
    //animating the frames
    function animate(timestamp: number): void {
        contX.clearRect(0, 0, CVX.width, CVX.height)
        const deltaTime = timestamp - lastTime
        lastTime = timestamp
        game.update(deltaTime)
        game.draw()
        requestAnimationFrame(animate)
    }
    animate(0)
}

