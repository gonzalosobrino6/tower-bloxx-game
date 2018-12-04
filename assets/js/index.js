window.onload = function () {
    var canvas = document.getElementById("main-canvas");
    
    var game = new Game (canvas);

    game.start();
}