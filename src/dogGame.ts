window.addEventListener("load", function () {
    const canvas: HTMLCanvasElement = document.getElementById("dogge")
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")
    canvas.width = 800
    canvas.height = 700


    let enemies: Enemy[] = []
    let score = 0
    let gameOver = false

    //user interaction class
    class InputHandler {
        readonly keys = new Array<string>

        constructor() {
            window.onkeydown = (e: KeyboardEvent) => {
                if ((e.key ==
                    "ArrowDown" || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight") && this.keys.indexOf(e.key)) {
                    this.keys.push(e.key)
                }
                if (this.keys.length > 2) {
                    this.keys.splice(this.keys.length - 1, 1)
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





    //player view handling class
    class Player {
        private gameWidth: number
        private gameHeight: number
        private width = 200 //final image weidth
        private height = 200 //final image height
        private x = 0
        private y: number
        private spriteHeight = 0 //image height
        private spriteWIdth = 0 //image weidth
        private frameX = 0
        private frameY = 0
        private speed = 0
        private vY = 0  //velocity Y
        private weight = 1 //players weight for handling gravity
        private image = new Image()
        //framing
        private maxFrame = 8
        private fps = 20
        private frameTimer = 0
        private frameInterval = 1000 / this.fps
        constructor(gameWidth: number, gameHeight: number) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.image.src = "../assets/player.png"
            this.y = this.gameHeight - this.height

        }
        update(input: InputHandler, deltaTime: number, enemies: Enemy[]) {

            /**Collision detection between enemy and player circle */
            enemies.forEach((enemy: Enemy) => {
                const dx = (enemy.x + enemy.width / 2) - (this.x + this.width / 2);
                const dy = (enemy.y + enemy.height / 2) - (this.y + this.height / 2);

                //calculate the Hypotenuse (distance between enemy center and player center points)
                const distance = Math.sqrt(dx * dx + dy * dy)//pythogorus theorem

                if (distance < (enemy.width / 2 + player.width / 2)) {
                    gameOver = true
                }
            });


            /** Movement handling starts **/
            //player movement handling
            if (input.keys.indexOf("ArrowRight") > -1) this.speed = 5
            else if (input.keys.indexOf("ArrowLeft") > -1) this.speed = -5
            else if (input.keys.indexOf("ArrowUp") > -1 && this.onGround()) { this.vY -= 25 }
            else this.speed = 0
            //Player boundry cross handling(horizontal moment)
            this.x += this.speed
            if (this.x <= 0) this.x = 0
            else if (this.x >= this.gameWidth - this.width) this.x = this.gameWidth - this.width
            this.y += this.vY
            //vertical moment handling
            if (!this.onGround()) {
                this.vY += this.weight
                this.frameY = 1
                this.maxFrame = 5
            }
            else {
                this.vY = 0
                this.maxFrame = 8
                this.frameY = 0
            }
            //handling playera max horizontal position
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height
            /**Movenent handling ends */

            /**framing logic starts */
            if (this.frameTimer > this.frameInterval) {

                if (this.frameX >= this.maxFrame) this.frameX = 0
                else this.frameX++
                this.frameTimer = 0
            } else {
                this.frameTimer += deltaTime
            }
            /**framing logic ends */
        }
        draw() {
            ctx.strokeStyle = "red"
            ctx.strokeRect(this.x, this.y, this.width, this.height)
            ctx.beginPath()
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2)
            ctx.stroke()
            ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
        }
        //provides  if player is in air or not
        private onGround() {
            return this.y >= this.gameHeight - this.height
        }
    }





    //background - environmental class
    class Background {
        private gameWidth: number
        private gameHeight: number
        private x = 0
        private y = 0
        private width = 2400
        private height = 700
        private speed: number = 2.5
        private image: HTMLImageElement = new Image()
        constructor(gameWeidth: number, gameHeight: number) {
            this.gameWidth = gameWeidth
            this.gameHeight = gameHeight
            this.image.src = "../assets/background.png"
        }
        update() {

            this.x -= this.speed
            if (this.x < 0 - this.width) this.x = 0
        }
        draw(context: CanvasRenderingContext2D) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
            context.drawImage(this.image, this.x + this.width - this.speed / 2, this.y, this.width, this.height)
        }
    }





    //enemy class
    class Enemy {
        private gameWidth: number
        private gameHeight: number
        private spriteWidth = 229
        private spriteHeight = 171
        public width = 0
        public height = 0
        public x = 0
        public y = 0
        private image = new Image()
        private frameX = 0
        private speed = Math.random() * 2.5 + 2.5
        public markForDeletion = false

        //framing variables
        private fps = 20
        private frameTimer = 0
        private frameInterval = 1000 / this.fps
        private maxFrame = 5


        constructor(gameWidth: number, gameHeight: number) {
            this.gameWidth = gameWidth
            this.width = this.spriteWidth / 2
            this.height = this.spriteHeight / 2
            this.gameHeight = gameHeight
            this.image.src = "../assets/enemy_worm.png"
            this.x = this.gameWidth
            this.y = this.gameHeight - this.height
        }
        update(deltaTime: number) {
            this.x -= this.speed
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0
                else this.frameX++
                this.frameTimer = 0
            } else {
                this.frameTimer += deltaTime
            }
            //delete of screen enemies
            if (this.x < 0 - this.width) {
                this.markForDeletion = true
                score++
            }
        }
        draw(ctx: CanvasRenderingContext2D) {
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
            ctx.strokeStyle = "blue"
            // ctx.strokeRect(this.x, this.y, this.width, this.height)
            ctx.beginPath()
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2)
            ctx.stroke()
        }
    }



    //adding and removing ememies
    function handleEnemies(deltaTime: number) {
        if (enemyTImer > enemyInterval + randomEnemyInterval) {

            enemies.push(new Enemy(canvas.width, canvas.height))
            enemyTImer = 0
            randomEnemyInterval = Math.random() * 1000 + 500
        } else {
            enemyTImer += deltaTime
        }


        enemies.forEach(enemy => {
            enemy.draw(ctx)
            enemy.update(deltaTime)
        })
        enemies = enemies.filter(enemy => !enemy.markForDeletion)
    }


    //display the current game status text
    function displayStatusText(context: CanvasRenderingContext2D) {
        context.fillStyle = "black"
        context.font = "40px Helvetica"
        context.fillText("Score: " + score, 50, 50)
        context.fillStyle = "white"
        context.fillText("Score: " + score, 52, 52)
        context.fillStyle = "black"
        context.font = "20px Helvetica"
        context.fillText("Hight Score: " + score, 50, 80)
        context.fillStyle = "white"
        context.fillText("Hight Score: " + score, 52, 82)

        //gameOver message
        if (gameOver) {
            context.textAlign = "center"
            context.font = "35px Impact"
            context.fillStyle = "green"
            context.fillText("Game Over try again!", canvas.width / 2, canvas.height / 2)
            context.fillStyle = "white"
            context.fillText("Game Over try again!", canvas.width / 2 + 1, canvas.height / 2 + 1)
            context.fillStyle = "green"
            context.fillText("Game Over try again!", canvas.width / 2 + 3, canvas.height / 2 + 3)

        }
    }

    const input = new InputHandler()
    const player = new Player(canvas.width, canvas.height)
    const background = new Background(canvas.width, canvas.height)
    const enemy1 = new Enemy(canvas.width, canvas.height)

    let lastTime = 0
    let enemyTImer = 0
    let enemyInterval = 1000 //for adding new ememies
    let randomEnemyInterval = Math.random() * 1000 + 500

    //run the animation
    function animate(timeStamp: number) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // background.update()
        background.draw(ctx)
        player.draw()
        player.update(input, deltaTime, enemies)
        handleEnemies(deltaTime)
        displayStatusText(ctx)
        if (!gameOver) requestAnimationFrame(animate)
    }
    animate(0)

})