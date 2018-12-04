function Launcher (ctx) {
    this.ctx = ctx;
    this.x = this.ctx.canvas.width / 2;
    this.x0 = this.x;
    this.y = 0;
    this.w = 50;
    this.h = 50;

    this.img = new Image();
    this.img.src = "assets/img/bloxx.png";

    this.imgGrua = new Image();
    this.imgGrua.src = "assets/img/ganchogrua.png";
    
    this.angle = 0;
    this.den = 128;
    this.angleStep = Math.PI / this.den; //128

    this.vx = -3;
    // this.setListeners();

    // this.bloxx = new Bloxx(this.ctx);
}

Launcher.prototype.draw = function () {
    this.ctx.save();  
  
    this.ctx.translate(this.x0, 0);
    this.ctx.rotate(this.angle)
    // grúa
    this.ctx.drawImage(
        this.imgGrua,
        0,
        0,
        20,
        150
    )         

    // bloxx
    this.ctx.drawImage(
        this.img,
        0 - this.w / 2,
        150,
        this.w,
        this.h
    )

    this.ctx.restore();
}





Launcher.prototype.move = function (time) {
    this.x += this.vx;
    this.angle += this.angleStep

    if (Math.abs(this.angle) >= Math.PI / 4) {
        this.angleStep *= -1;
        this.vx *= -1;
    }
}

Launcher.prototype.increaseSpeed = function () {
   this.den = 50;
}





