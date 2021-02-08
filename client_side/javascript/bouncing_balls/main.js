// Set up canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const para = document.querySelector('p');
let count = 0;

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Function to generator random number
function randomNum(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// Modelling a ball
function Shape(x, y, velX, velY, exists) {
    this.x = x;             // Coordinates. This can range between 0 (top left hand corner) to the width and height of the browser viewport (bottom right hand corner).
    this.y = y;
    this.velX = velX;       // Velocity.
    this.velY = velY;
    this.exists = exists;
    // this.color = color;
    // this.size = size;       // Its radius, in pixels.
}

function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
}

function EvilCircle(x, y, exists) {
    Shape.call(this, x, y, 20, 20, exists);
    this.color = 'white';
    this.size = 10;
}

EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
}

EvilCircle.prototype.checkBounds = function() {
    if ((this.x + this.size) >= width) {
        this.x -= this.size;           
    }

    if ((this.x - this.size) <= 0) {
        this.x += this.size;           
    }

    if ((this.y + this.size) >= height) {
        this.y -= this.size;           
    }

    if ((this.y - this.size) <= 0) {
        this.y += this.size;           
    }
}

EvilCircle.prototype.setControls = function() {
    let _this = this;        // Prevent messing up the function scope.
    window.onkeydown = function(e) {
        if (e.key === 'a') {
            _this.x -= _this.velX;
        } else if (e.key === 'd') {
            _this.x += _this.velX;
        } else if (e.key === 'w') {
            _this.y -= _this.velY;
        } else if (e.key === 's') {
            _this.y += _this.velY;
        }
    }
}

EvilCircle.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
        if (balls[j].exists) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].exists = false;
                count--;
                para.textContent = 'Ball count: ' + count;
            } 
        }
    }
}

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

// let testBall = new Ball(50, 100, 4, 4, 'blue', 10);

// Update the position of the ball
Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);           // the ball is going off the right edge
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);           // the ball is going off the left edge
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);           // the ball is going off the bottom edge
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);           // the ball is going off the top edge
    }

    this.x += this.velX;
    this.y += this.velY;
}

// Animating the ball
let balls = [];
while (balls.length < 25) {
    let size = randomNum(10, 20);
    let ball = new Ball(
        randomNum(0 + size, width - size),
        randomNum(0 + size, height - size),
        randomNum(-7, 7),
        randomNum(-7, 7),
        true,
        'rgb(' + randomNum(0, 255) + ',' + randomNum(0, 255) + ',' + randomNum(0, 255) + ')',
        size
    );
    balls.push(ball);
    count++;
    para.textContent = 'Ball count: ' + count;
}

// Collision detection
Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j]) && balls[j].exists) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = `rgb(${randomNum(0,255)},${randomNum(0,255)},${randomNum(0,255)})`;
            } 
        }
    }
}

let evilCirc = new EvilCircle(randomNum(0,width), randomNum(0,height), true);
evilCirc.setControls();

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);


    balls.forEach(ball => {
        if (ball.exists) {
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
    });

    evilCirc.draw();
    evilCirc.checkBounds();
    evilCirc.collisionDetect();

    requestAnimationFrame(loop);
}

loop();






