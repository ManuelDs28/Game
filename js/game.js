class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.ball = new Ball(this.ctx, 400, 700);
    this.bg = new Background(this.ctx);
    this.player = new Player(this.ctx, this.ctx.canvas.width / 2, 700);
    this.bricks = new Bricks(this.ctx, this.ctx.canvas.width / 2, 150);
    this.intervalId = null;
    this.lives = 3;
    this.score = 0;
    this.allBricks = [];
    this.introSound = new Audio("./sounds/intro.mp3");
    this.introSound.volume = 0.1;
    this.sound = new Audio("./sounds/game.wav");
    this.sound.volume = 0.1;
    this.winSound = new Audio("./sounds/win.wav");
    this.gameOverSound = new Audio("./sounds/gameovertwo.wav");
    this.playerSound = new Audio("./sounds/player.wav");
    this.brickSound = new Audio("./sounds/brick.wav");
    this.brickSoundTwo = new Audio("./sounds/brick2.wav");

    this.scoreImg = new Image();
    this.isReady = false;
    this.scoreImg.src = "./images/score.png";
    this.scoreImg.onload = () => {
      this.isReady = true;
    };
    this.livesImg = new Image();
    this.isReady = false;
    this.livesImg.src = "./images/heart.png";
    this.livesImg.onload = () => {
      this.isReady = true;
    };
  }
  start() {
    this.intervalId = setInterval(() => {
      this.sound.play();
      this.clear();
      this.draw();
      this.checkCollisions();
      this.resetGame();
      this.move();
      this.tick++;
    }, 1000 / 60);
  }

  draw() {
    this.bg.draw();
    this.bricks.draw();
    this.ball.draw();
    this.player.draw();
    this.drawScore();
    this.lives > 0 && this.drawLives();
  }

  move() {
    this.ball.move();
    this.player.move();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  checkCollisions() {
    this.allBricks = this.bricks.bricks.reduce((acc, row) => {
      acc = [...acc, ...row];
      return acc;
    }, []);

    const brickColliding = this.allBricks.find((brick) => {
      return this.ball.collideWith(brick);
    });

    if (brickColliding && brickColliding.status && this.ball.canCollide) {
      brickColliding.img = brickColliding.brokeImg;
      brickColliding.status = brickColliding.status - 1;
      if (brickColliding.status === 1) {
        this.brickSoundTwo.currentTime = 0;
        this.brickSoundTwo.play();
      }
      if (brickColliding.status === 0) {
        this.brickSound.currentTime = 0;
        this.brickSound.play();
      }
      this.ball.disableCollide();

      if (
        this.ball.isBottomColliding(brickColliding) ||
        this.ball.isTopColliding(brickColliding)
      ) {
        this.ball.invertYDirection();
      } else if (
        this.ball.isLeftColliding(brickColliding) ||
        this.ball.isRightColliding(brickColliding)
      ) {
        this.ball.invertXDirection();
      }

      setTimeout(() => {
        this.ball.enableCollide();
      }, 100);
      if (brickColliding.status) {
        this.score += 10;
      }
    }

    if (this.ball.isBottomColliding(this.player)) {
      this.playerSound.play();
      this.ball.ballPlayerCollision(this.player);
    }
  }

  gameOver() {
    clearInterval(this.intervalId);
    this.gameOverSound.play();
    this.sound.pause();
    this.introSound.play();
    this.clear();
    this.draw();
    this.ctx.fillStyle = "Orange";
    this.ctx.font = "50px Rubik Glitch";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Game Over",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
    setTimeout(() => {
      const playAgain = document.querySelector(".play-again");
      playAgain.classList.remove("hidden");
      canvas.classList.add("hidden");
      playAgain.addEventListener("click", () => {});
    }, 500);
  }
  youWin() {
    clearInterval(this.intervalId);
    this.winSound.play();
    this.sound.pause();
    this.introSound.play();
    this.clear();
    this.draw();
    this.ctx.fillStyle = "Orange";
    this.ctx.font = "50px Rubik Glitch";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "¡You Win!",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
    setTimeout(() => {
      const playAgain = document.querySelector(".play-again");
      playAgain.classList.remove("hidden");
      canvas.classList.add("hidden");
      playAgain.addEventListener("click", () => {});
    }, 500);
  }

  resetGame() {
    if (this.ball.isOff === true) {
      if (this.lives > 1) {
        this.lives--;

        this.ball.x = this.ctx.canvas.width / 2;
        this.ball.y = this.ctx.canvas.height - 165;
        this.x = this.ball.vx;
        this.y = -this.ball.vy;
        this.player.x = (this.ctx.canvas.width - this.player.width) / 2;

        this.ball.isOff = false;
      } else {
        this.lives--;
        this.drawLives();
        this.gameOver();
      }
    }

    if (this.allBricks.filter((brick) => brick.status !== 0).length === 0) {
      this.youWin();
    }
  }

  drawLives() {
    if (this.lives === 3) {
      this.isReady && this.ctx.drawImage(this.livesImg, 580, 750, 30, 30);
      this.isReady && this.ctx.drawImage(this.livesImg, 615, 750, 30, 30);
      this.isReady && this.ctx.drawImage(this.livesImg, 650, 750, 30, 30);
    } else if (this.lives === 2) {
      this.isReady && this.ctx.drawImage(this.livesImg, 615, 750, 30, 30);
      this.isReady && this.ctx.drawImage(this.livesImg, 650, 750, 30, 30);
    } else {
      this.isReady && this.ctx.drawImage(this.livesImg, 650, 750, 30, 30);
    }
  }

  drawScore() {
    this.isReady && this.ctx.drawImage(this.scoreImg, 20, 750, 140, 40);
    this.ctx.fillText(this.score, 80, 775);

    this.ctx.font = "15px Rubik Glitch";
    this.ctx.fillStyle = "#AFF600";
  }
}
