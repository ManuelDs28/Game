class Bricks {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vy = -2;
    this.brickRowCount = 5;
    this.brickColumnCount = 6;
    this.bricksGap = 5;
    this.brickWidth =
      this.ctx.canvas.width / this.brickRowCount - this.bricksGap;
    this.brickHeight = 50;
    this.brickPadding = 10;
    this.brickOffsetTop = 50;
    this.brickOffsetLeft = 30;
    this.bricks = [];
    this.imagesPaths = [
      "brown",
      "grey",
      "purple",
      "orange",
      "blue",
      "green",
      "red",
      "yellow",
      "greentwo",
      "bluecla",
    ];
    this.imagesPathsTwo = [
      "brokebrown",
      "brokegrey",
      "brokepurple",
      "brokeorange",
      "brokeblue",
      "brokegreen",
      "brokered",
      "brokeyellow",
      "brokegreentwo",
      "brokecla",
    ];

    new Array(this.brickRowCount).fill("").forEach((e, row) => {
      this.bricks[row] = [];
      new Array(this.brickColumnCount).fill("").forEach((e, column) => {
        const randomColor = Math.floor(Math.random() * this.imagesPaths.length);
        const image = new Image();
        image.src = `./images/${this.imagesPaths[randomColor]}.png`;
        const brokeImage = new Image();
        brokeImage.src = `./images/${this.imagesPathsTwo[randomColor]}.png`;
        const brickToAdd = {
          x: row * this.brickWidth + this.bricksGap * row,
          y: column * this.brickHeight + this.bricksGap * column,
          width: this.brickWidth,
          height: this.brickHeight,
          img: image,
          brokeImg: brokeImage,
          isReady: false,
          column,
          row,
          id: column + row,
          status: 2,
        };
        image.onload = () => {
          brickToAdd.isReady = true;
        };

        this.bricks[row][column] = brickToAdd;
      });
    });
  }

  draw() {
    const allBricks = this.bricks.reduce((acc, row) => {
      acc = [...acc, ...row];
      return acc;
    }, []);

    allBricks.forEach((element) => {
      if (element.status && element.isReady) {
        this.ctx.drawImage(
          element.img,
          element.x,
          element.y,
          this.brickWidth,
          this.brickHeight
        );
      }
    });
  }
}
