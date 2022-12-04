class Bricks {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.x = x;
    this.y = y;
    this.vy = -2;
    this.brickRowCount = 7;
    this.brickColumnCount = 5;
    this.bricksGap = 10;
    this.brickWidth = (this.ctx.canvas.width / this.brickRowCount) - this.bricksGap;
    this.brickHeight = 60;
    this.brickPadding = 10;
    this.brickOffsetTop = 50;
    this.brickOffsetLeft = 30;
    this.bricks = [];
     
    new Array(this.brickColumnCount).fill('').forEach((e, column) => {
      this.bricks[column] = [];
      new Array(this.brickRowCount).fill('').forEach((e, row) => {

        this.bricks[column][row] = {
          x: row * this.brickWidth + this.bricksGap * row,
          y: column * this.brickHeight + this.bricksGap * column, 
          width: this.brickWidth,
          height: this.brickHeight,
          color: random_rgba(),
          column,
          row: row,
          id: column + row,
          status: 1
        };
      })
    })

  }
  
  draw() {
    const allBricks = this.bricks.reduce((acc, row) => {
      acc = [...acc, ...row]
      return acc
    }, [])
    
    allBricks.forEach(element => {
      if (element.status) {
        ctx.beginPath();
        ctx.rect(element.x, element.y, this.brickWidth, this.brickHeight);
        ctx.fillStyle = element.color
        ctx.fill();
        ctx.closePath();
      }
     
    });
  }
}

function random_rgba() {
     const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
     const r = randomBetween(0, 255);
     const g = randomBetween(0, 255);
     const b = randomBetween(0, 255);
     const rgb = `rgb(${r},${g},${b})`;
     return rgb;
 }


 
    
