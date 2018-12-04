function Bloxx (ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;

    this.img = new Image();
    this.img.src = "assets/img/bloxx.png";

    this.vy = 5;
    this.g = 0.1;

    // this.launcher = new Launcher(this.ctx);
}

Bloxx.prototype.draw = function () {
    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
    )
}

Bloxx.prototype.move = function () {
        this.vy += this.g;
        this.y += this.vy;
}

Bloxx.prototype.move2 = function () {
    if (this.y > 600) {
        this.vy = 0;
    } else {
        this.vy += this.g;
        this.y += this.vy;
    }
}

// Bloxx.prototype.move2 = function () {
//     this.vy += this.g;
//     this.y += this.vy;
// }



// Bloxx.prototype.move = function (time) {
    
// }

Bloxx.prototype.touchedFloor = function () {
    this.y > 600;
    this.vy = 0;;
}




