function Background (ctx) {
    this.ctx = ctx;
    
    this.x = 0;
    this.y = 0;
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;

    this.img = new Image ();
    this.img.src = "assets/img/citybackground.png";   

}

Background.prototype.draw = function () {
    this.ctx.fillStyle = "rgb(94, 144, 255)";
    this.ctx.fillRect(
        0,
        0,
        this.w,
        this.h,
    )   

    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
    ) 
}   

Background.prototype.move = function () {

    // 95,125,255  
    this.y += 50;
}

