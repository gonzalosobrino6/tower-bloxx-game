function Game(canvasElement) {
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  this.ctx = canvasElement.getContext("2d");
  this.intervalId = undefined;

  this.bg = new Background(this.ctx);
  this.launcher = new Launcher(this.ctx);
  this.bloxx = undefined;

  this.setListeners();

  this.boxes = [];
  this.counter = 0;
  this.currentBoxesInc = 0;
}

Game.prototype.setListeners = function() {
  document.onkeydown = this.onKeyDown.bind(this);
};

Game.prototype.onKeyDown = function(event) {
  if (event.keyCode === SPACE || (event.keyCode === DOWN && !this.bloxx)) {
    this.bloxx = new Bloxx(this.ctx, this.launcher.x, this.launcher.y + 150);
    this.boxes.push(this.bloxx);
    this.bloxx = undefined;
    console.log(this.boxes);
    if (this.boxes.length > 2) {
      this.bg.move();
      this.boxes.forEach(function(box) {
        box.y += 50;
      });
    }
    this.counter++;
    this.counterAdd();
  }
};

Game.prototype.start = function() {
  this.intervalId = setInterval(
    function() {
      this.clearAll();
      this.drawAll();
      this.moveAll();
      this.increaseSpeedIf();
    }.bind(this),
    DRAW_INTERVAL
  );
};

Game.prototype.drawAll = function() {
  this.bg.draw();
  this.launcher.draw();
  this.boxes.forEach(function(box) {
    box.draw();
  });
  if (this.bloxx) {
    this.bloxx.draw();
  }
};

Game.prototype.moveAll = function() {
  this.bg.move2();
  this.launcher.move();
  if (this.boxes.length <= 1 && this.boxes != "") {
    this.boxes[this.boxes.length - 1].move2();
  } else if (this.hasCollision()) {
    this.boxes[this.boxes.length - 1].move();
    if (
      this.boxes[this.boxes.length - 1].y + 50 >
      this.boxes[this.boxes.length - 2].y
    ) {
      this.boxes[this.boxes.length - 1].y =
        this.boxes[this.boxes.length - 2].y - 50; // this y < this.y -1 --> v = 0
    }
    console.log("Collision!");
  } else {
    if (this.boxes != "") {
      this.boxes[this.boxes.length - 1].move();
      if (this.boxes[this.boxes.length - 1].y > window.innerHeight) {
        alert("Eres un paquete");
      }
    }
  }

  if (this.bloxx) {
    this.bloxx.move();
    this.bloxx.move2();
  }
};

Game.prototype.hasCollision = function() {
  this.lastBloxx2 = this.boxes[this.boxes.length - 1];
  this.penultimateBloxx1 = this.boxes[this.boxes.length - 2];

  if (this.boxes != "") {
    if (
      (this.penultimateBloxx1.x < this.lastBloxx2.x &&
        this.lastBloxx2.x <
          this.penultimateBloxx1.x + this.penultimateBloxx1.w) ||
      (this.penultimateBloxx1.x - this.penultimateBloxx1.w <
        this.lastBloxx2.x &&
        this.lastBloxx2.x < this.penultimateBloxx1.x) ||
      this.lastBloxx2.x === this.penultimateBloxx1.x
    ) {
      return true;
    } else {
      return false;
    }
  }
};

Game.prototype.clearAll = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};

Game.prototype.counterAdd = function() {
  console.log(this.counter);
  var counter = document.getElementById("counter");
  counter.innerText = this.counter;
};

Game.prototype.increaseSpeedIf = function() {
  if (
    this.boxes.length > 0 &&
    this.boxes.length % 2 === 0 &&
    this.currentBoxesInc !== this.boxes.length
  ) {
    this.currentBoxesInc = this.boxes.length;
    this.launcher.increaseSpeed();
  }
};
