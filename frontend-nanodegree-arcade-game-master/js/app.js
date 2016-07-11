var level=0,score=0,win=0,hearts=0;

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x=x;
    this.y=y;
    this.speed=200;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
var allEnemies=[
    new Enemy(250,50),
    new Enemy(150,190),
    new Enemy(0,180),
    new Enemy(100,100)
];

var updateEnemyPositions=function(){

    var allEnemies=[
        new Enemy(-100,35*Math.floor(Math.random()*10)),
        new Enemy(-200,35*Math.floor(Math.random()*10)),
        new Enemy(-250,35*Math.floor(Math.random()*10)),
        new Enemy(-350,35*Math.floor(Math.random()*10))
    ];
    return allEnemies;
};

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x>500) {
        //this.x= -100;
        allEnemies= updateEnemyPositions();
    }
    this.x += dt * (this.speed+level);
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var Player = function() {
    this.x=200;
    this.y=400;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

};

Player.prototype.checkLevelUp = function() {
    if(win>=0 && win%5==0) {
        level+=100;
    }
};

Player.prototype.resetPlayer = function() {
    this.x=200;
    this.y=400;
    this.speed=200;
};

Player.prototype.win =function() {
    score+=10;
    win++;
    Player.checkLevelUp();
    Player.resetPlayer();
};

Player.prototype.lost = function() {
    // resetScore();
    // resetLevel();
    // resetSpeed();
    score=0;
    level=0;
    win=0;
    Player.resetPlayer();
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "25pt 'Sigmar One'";
    var lev=level/100+1;
    ctx.fillText("Score: "+score+ "     Level: "+lev, 50, 100);
};

Player.prototype.handleInput = function(direction) {
    if(direction == "left") {
        if(this.x<=0){
            this.x += 50;
        }
        this.x -= 50;
        console.log("x:"+this.x);
    }
    if(direction == "right") {
        if(this.x >= 400){
            this.x -= 50;
        }
        this.x += 50;
    }
    if(direction == "up") {
        if(this.y<=0) {
            this.y +=50;
        }
        this.y -= 50;
        console.log("y:"+this.y);
    }
    if(direction == "down") {
        if(this.y>=400){
            this.y -=50;
        }
        this.y += 50;
    }
};

var stars= function() {
    this.x=100;
    this.y=250;
    this.sprite='images/Star.png';
};

stars.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var lives= function() {
    this.x=0;
    this.y=175;
    this.sprite='images/Heart.png';
};

lives.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,100,150);
};


Player.prototype.bonus = function(x,y) {
    score+=5;
    stars.x = x+100;
    stars.y = y+50;
};

Player.prototype.skipDeath = function(x,y) {
    hearts++;
    lives.x=-100;
    lives.y=-100;
    return hearts;
};

var Player=new Player();
var stars=new stars();
var lives=new lives();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    Player.handleInput(allowedKeys[e.keyCode]);
});
