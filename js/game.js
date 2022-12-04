class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.ball = new Ball(this.ctx, 400, 780);
    this.bg = new Background(this.ctx);
    this.player = new Player(this.ctx, this.ctx.canvas.width / 2, 800);
    this.bricks = new Bricks(this.ctx, this.ctx.canvas.width / 2, 150);
    this.intervalId = null;
    this.lives = 3;
    this.score = 0;
  }
  start() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw();
      this.checkCollisions();
      this.move();
      this.tick++;
      if (this.ball.isOff && this.lives <= 0) {
        this.gameOver();
      // } else{
      //   this.resetGame();
      }

    }, 1000 / 60);
  }

  draw() {
    this.bg.draw();
    this.bricks.draw();
    this.ball.draw();
    this.player.draw();
    this.drawScore();
    this.drawLives();
  }

  move() {
    this.ball.move();
    this.player.move();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  checkCollisions() {
    const allBricks = this.bricks.bricks.reduce((acc, row) => {
      acc = [...acc, ...row];
      return acc;
    }, []);

    const brickColliding = allBricks.find((brick) => {
      return this.ball.collideWith(brick);
    });

    if (brickColliding &&  brickColliding.status && this.ball.canCollide) {

      brickColliding.status = 0;
      this.ball.disableCollide();
      this.ball.vy = -this.ball.vy;

      setTimeout(() => {
        this.ball.canCollide = true
      }, 200)
      this.score += 10;
    }

    if (
      this.ball.x < this.player.x + this.player.width &&
      this.ball.x + this.ball.width > this.player.x &&
      this.ball.y < this.player.y + this.player.width &&
      this.ball.y + this.ball.height > this.player.y &&
      this.ball.prevY + this.ball.height <= this.player.y
    ) {
      this.ball.vy = -this.ball.vy
    } 
  }

  gameOver() {
    if (this.lives <= 0) {
      clearInterval(this.intervalId);
      this.ctx.fillStyle = "Orange";
      this.ctx.font = "50px Rubik Glitch";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "Game Over",
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2
      );
    }
  }

  // resetGame(){
  //     clearInterval(this.intervalId)
  //     this.player.ctx.canvas.width / 2;
  //     this.ball.ctx.canvas.width / 2
  //     this.player.y = 800
  //     this.ball.y = 780
  // }

  drawLives() {
    ctx.font = "15px Rubik Glitch";
    ctx.fillStyle = "#Orange";
    ctx.fillText(`Lives: ${this.lives}`, 720, 920);
  }

  drawScore() {
    this.ctx.fillStyle = "Orange";
    this.ctx.font = "15px Rubik Glitch";
    this.ctx.fillText("Score: " + this.score, 20, 920);
  }
}
